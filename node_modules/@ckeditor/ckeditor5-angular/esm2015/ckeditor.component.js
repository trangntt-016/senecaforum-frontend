/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
import { __awaiter } from "tslib";
import { Component, Input, Output, NgZone, EventEmitter, forwardRef, ElementRef } from '@angular/core';
import EditorWatchdog from '@ckeditor/ckeditor5-watchdog/src/editorwatchdog';
import uid from './uid';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class CKEditorComponent {
    constructor(elementRef, ngZone) {
        /**
         * The configuration of the editor.
         * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html
         * to learn more.
         */
        this.config = {};
        /**
         * The initial data of the editor. Useful when not using the ngModel.
         * See https://angular.io/api/forms/NgModel to learn more.
         */
        this.data = '';
        /**
         * Tag name of the editor component.
         *
         * The default tag is 'div'.
         */
        this.tagName = 'div';
        /**
         * Fires when the editor is ready. It corresponds with the `editor#ready`
         * https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html#event-ready
         * event.
         */
        this.ready = new EventEmitter();
        /**
         * Fires when the content of the editor has changed. It corresponds with the `editor.model.document#change`
         * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_document-Document.html#event-change
         * event.
         */
        this.change = new EventEmitter();
        /**
         * Fires when the editing view of the editor is blurred. It corresponds with the `editor.editing.view.document#blur`
         * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_document-Document.html#event-event:blur
         * event.
         */
        this.blur = new EventEmitter();
        /**
         * Fires when the editing view of the editor is focused. It corresponds with the `editor.editing.view.document#focus`
         * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_document-Document.html#event-event:focus
         * event.
         */
        this.focus = new EventEmitter();
        /**
         * Fires when the editor component crashes.
         */
        this.error = new EventEmitter();
        /**
         * If the component is read–only before the editor instance is created, it remembers that state,
         * so the editor can become read–only once it is ready.
         */
        this.initiallyDisabled = false;
        /**
         * A lock flag preventing from calling the `cvaOnChange()` during setting editor data.
         */
        this.isEditorSettingData = false;
        this.id = uid();
        this.ngZone = ngZone;
        this.elementRef = elementRef;
    }
    /**
     * When set `true`, the editor becomes read-only.
     * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html#member-isReadOnly
     * to learn more.
     */
    set disabled(isDisabled) {
        this.setDisabledState(isDisabled);
    }
    get disabled() {
        if (this.editorInstance) {
            return this.editorInstance.isReadOnly;
        }
        return this.initiallyDisabled;
    }
    /**
     * The instance of the editor created by this component.
     */
    get editorInstance() {
        let editorWatchdog = this.editorWatchdog;
        if (this.watchdog) {
            // Temporarily use the `_watchdogs` internal map as the `getItem()` method throws
            // an error when the item is not registered yet.
            // See https://github.com/ckeditor/ckeditor5-angular/issues/177.
            editorWatchdog = this.watchdog._watchdogs.get(this.id);
        }
        if (editorWatchdog) {
            return editorWatchdog.editor;
        }
        return null;
    }
    // Implementing the AfterViewInit interface.
    ngAfterViewInit() {
        this.attachToWatchdog();
    }
    // Implementing the OnDestroy interface.
    ngOnDestroy() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.watchdog) {
                yield this.watchdog.remove(this.id);
            }
            else if (this.editorWatchdog && this.editorWatchdog.editor) {
                yield this.editorWatchdog.destroy();
                this.editorWatchdog = undefined;
            }
        });
    }
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    writeValue(value) {
        // This method is called with the `null` value when the form resets.
        // A component's responsibility is to restore to the initial state.
        if (value === null) {
            value = '';
        }
        // If already initialized.
        if (this.editorInstance) {
            // The lock mechanism prevents from calling `cvaOnChange()` during changing
            // the editor state. See #139
            this.isEditorSettingData = true;
            this.editorInstance.setData(value);
            this.isEditorSettingData = false;
        }
        // If not, wait for it to be ready; store the data.
        else {
            this.data = value;
            // If the editor element is already available, then update its content.
            // If the ngModel is used then the editor element should be updated directly here.
            if (this.editorElement) {
                this.editorElement.innerHTML = this.data;
            }
        }
    }
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    registerOnChange(callback) {
        this.cvaOnChange = callback;
    }
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    registerOnTouched(callback) {
        this.cvaOnTouched = callback;
    }
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    setDisabledState(isDisabled) {
        // If already initialized.
        if (this.editorInstance) {
            this.editorInstance.isReadOnly = isDisabled;
        }
        // Store the state anyway to use it once the editor is created.
        this.initiallyDisabled = isDisabled;
    }
    /**
     * Creates the editor instance, sets initial editor data, then integrates
     * the editor with the Angular component. This method does not use the `editor.setData()`
     * because of the issue in the collaboration mode (#6).
     */
    attachToWatchdog() {
        const creator = (element, config) => __awaiter(this, void 0, void 0, function* () {
            return this.ngZone.runOutsideAngular(() => __awaiter(this, void 0, void 0, function* () {
                this.elementRef.nativeElement.appendChild(element);
                const editor = yield this.editor.create(element, config);
                if (this.initiallyDisabled) {
                    editor.isReadOnly = this.initiallyDisabled;
                }
                this.ngZone.run(() => {
                    this.ready.emit(editor);
                });
                this.setUpEditorEvents(editor);
                return editor;
            }));
        });
        const destructor = (editor) => __awaiter(this, void 0, void 0, function* () {
            yield editor.destroy();
            this.elementRef.nativeElement.removeChild(this.editorElement);
        });
        const emitError = () => {
            this.ngZone.run(() => {
                this.error.emit();
            });
        };
        const element = document.createElement(this.tagName);
        const config = this.getConfig();
        this.editorElement = element;
        // Based on the presence of the watchdog decide how to initialize the editor.
        if (this.watchdog) {
            // When the context watchdog is passed add the new item to it based on the passed configuration.
            this.watchdog.add({
                id: this.id,
                type: 'editor',
                creator,
                destructor,
                sourceElementOrData: element,
                config
            });
            this.watchdog.on('itemError', (_, { itemId }) => {
                if (itemId === this.id) {
                    emitError();
                }
            });
        }
        else {
            // In the other case create the watchdog by hand to keep the editor running.
            const editorWatchdog = new EditorWatchdog(this.editor);
            editorWatchdog.setCreator(creator);
            editorWatchdog.setDestructor(destructor);
            editorWatchdog.on('error', emitError);
            this.editorWatchdog = editorWatchdog;
            this.editorWatchdog.create(element, config);
        }
    }
    getConfig() {
        if (this.data && this.config.initialData) {
            throw new Error('Editor data should be provided either using `config.initialData` or `data` properties.');
        }
        // Merge two possible ways of providing data into the `config.initialData` field.
        return Object.assign(Object.assign({}, this.config), { initialData: this.config.initialData || this.data || '' });
    }
    /**
     * Integrates the editor with the component by attaching related event listeners.
     */
    setUpEditorEvents(editor) {
        const modelDocument = editor.model.document;
        const viewDocument = editor.editing.view.document;
        modelDocument.on('change:data', (evt) => {
            this.ngZone.run(() => {
                if (this.cvaOnChange && !this.isEditorSettingData) {
                    const data = editor.getData();
                    this.cvaOnChange(data);
                }
                this.change.emit({ event: evt, editor });
            });
        });
        viewDocument.on('focus', (evt) => {
            this.ngZone.run(() => {
                this.focus.emit({ event: evt, editor });
            });
        });
        viewDocument.on('blur', (evt) => {
            this.ngZone.run(() => {
                if (this.cvaOnTouched) {
                    this.cvaOnTouched();
                }
                this.blur.emit({ event: evt, editor });
            });
        });
    }
}
CKEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'ckeditor',
                template: '<ng-template></ng-template>',
                // Integration with @angular/forms.
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        // eslint-disable-next-line @typescript-eslint/no-use-before-define
                        useExisting: forwardRef(() => CKEditorComponent),
                        multi: true
                    }
                ]
            },] }
];
CKEditorComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
CKEditorComponent.propDecorators = {
    editor: [{ type: Input }],
    config: [{ type: Input }],
    data: [{ type: Input }],
    tagName: [{ type: Input }],
    watchdog: [{ type: Input }],
    disabled: [{ type: Input }],
    ready: [{ type: Output }],
    change: [{ type: Output }],
    blur: [{ type: Output }],
    focus: [{ type: Output }],
    error: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2tlZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9tYWNpZWpidWtvd3NraS93b3Jrc3BhY2UvaW50ZWdyYXRpb25zL2NrZWRpdG9yNS1hbmd1bGFyL3NyYy9ja2VkaXRvci8iLCJzb3VyY2VzIjpbImNrZWRpdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUNOLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxFQUVWLFVBQVUsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLGNBQWMsTUFBTSxpREFBaUQsQ0FBQztBQUU3RSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUM7QUFFeEIsT0FBTyxFQUVOLGlCQUFpQixFQUNqQixNQUFNLGdCQUFnQixDQUFDO0FBaUN4QixNQUFNLE9BQU8saUJBQWlCO0lBeUo3QixZQUFvQixVQUFzQixFQUFFLE1BQWM7UUE3STFEOzs7O1dBSUc7UUFDYSxXQUFNLEdBQXFCLEVBQUUsQ0FBQztRQUU5Qzs7O1dBR0c7UUFDYSxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRTFCOzs7O1dBSUc7UUFDYSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBd0JoQzs7OztXQUlHO1FBQ2MsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDO1FBRTlEOzs7O1dBSUc7UUFDYyxXQUFNLEdBQThCLElBQUksWUFBWSxFQUFlLENBQUM7UUFFckY7Ozs7V0FJRztRQUNjLFNBQUksR0FBNEIsSUFBSSxZQUFZLEVBQWEsQ0FBQztRQUUvRTs7OztXQUlHO1FBQ2MsVUFBSyxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO1FBRWxGOztXQUVHO1FBQ2MsVUFBSyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBNEJ0RTs7O1dBR0c7UUFDSyxzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUE2QmxDOztXQUVHO1FBQ0ssd0JB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biAqIEBsaWNlbnNlIENvcHlyaWdodCAoYykgMjAwMy0yMDIwLCBDS1NvdXJjZSAtIEZyZWRlcmljbyBLbmFiYmVuLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogRm9yIGxpY2Vuc2luZywgc2VlIExJQ0VOU0UubWQuXG4gKi9cblxuaW1wb3J0IHtcblx0Q29tcG9uZW50LFxuXHRJbnB1dCxcblx0T3V0cHV0LFxuXHROZ1pvbmUsXG5cdEV2ZW50RW1pdHRlcixcblx0Zm9yd2FyZFJlZixcblx0QWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LFxuXHRFbGVtZW50UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgRWRpdG9yV2F0Y2hkb2cgZnJvbSAnQGNrZWRpdG9yL2NrZWRpdG9yNS13YXRjaGRvZy9zcmMvZWRpdG9yd2F0Y2hkb2cnO1xuXG5pbXBvcnQgdWlkIGZyb20gJy4vdWlkJztcblxuaW1wb3J0IHtcblx0Q29udHJvbFZhbHVlQWNjZXNzb3IsXG5cdE5HX1ZBTFVFX0FDQ0VTU09SXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQ0tFZGl0b3I1IH0gZnJvbSAnLi9ja2VkaXRvcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmx1ckV2ZW50IHtcblx0ZXZlbnQ6IENLRWRpdG9yNS5FdmVudEluZm88J2JsdXInPjtcblx0ZWRpdG9yOiBDS0VkaXRvcjUuRWRpdG9yO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvY3VzRXZlbnQge1xuXHRldmVudDogQ0tFZGl0b3I1LkV2ZW50SW5mbzwnZm9jdXMnPjtcblx0ZWRpdG9yOiBDS0VkaXRvcjUuRWRpdG9yO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZUV2ZW50IHtcblx0ZXZlbnQ6IENLRWRpdG9yNS5FdmVudEluZm88J2NoYW5nZTpkYXRhJz47XG5cdGVkaXRvcjogQ0tFZGl0b3I1LkVkaXRvcjtcbn1cblxuQENvbXBvbmVudCgge1xuXHRzZWxlY3RvcjogJ2NrZWRpdG9yJyxcblx0dGVtcGxhdGU6ICc8bmctdGVtcGxhdGU+PC9uZy10ZW1wbGF0ZT4nLFxuXG5cdC8vIEludGVncmF0aW9uIHdpdGggQGFuZ3VsYXIvZm9ybXMuXG5cdHByb3ZpZGVyczogW1xuXHRcdHtcblx0XHRcdHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11c2UtYmVmb3JlLWRlZmluZVxuXHRcdFx0dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoICgpID0+IENLRWRpdG9yQ29tcG9uZW50ICksXG5cdFx0XHRtdWx0aTogdHJ1ZVxuXHRcdH1cblx0XVxufSApXG5leHBvcnQgY2xhc3MgQ0tFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblx0LyoqXG5cdCAqIFRoZSByZWZlcmVuY2UgdG8gdGhlIERPTSBlbGVtZW50IGNyZWF0ZWQgYnkgdGhlIGNvbXBvbmVudC5cblx0ICovXG5cdHByaXZhdGUgZWxlbWVudFJlZiE6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG5cdC8qKlxuXHQgKiBUaGUgY29uc3RydWN0b3Igb2YgdGhlIGVkaXRvciB0byBiZSB1c2VkIGZvciB0aGUgaW5zdGFuY2Ugb2YgdGhlIGNvbXBvbmVudC5cblx0ICogSXQgY2FuIGJlIGUuZy4gdGhlIGBDbGFzc2ljRWRpdG9yQnVpbGRgLCBgSW5saW5lRWRpdG9yQnVpbGRgIG9yIHNvbWUgY3VzdG9tIGVkaXRvci5cblx0ICovXG5cdEBJbnB1dCgpIHB1YmxpYyBlZGl0b3I/OiBDS0VkaXRvcjUuRWRpdG9yQ29uc3RydWN0b3I7XG5cblx0LyoqXG5cdCAqIFRoZSBjb25maWd1cmF0aW9uIG9mIHRoZSBlZGl0b3IuXG5cdCAqIFNlZSBodHRwczovL2NrZWRpdG9yLmNvbS9kb2NzL2NrZWRpdG9yNS9sYXRlc3QvYXBpL21vZHVsZV9jb3JlX2VkaXRvcl9lZGl0b3Jjb25maWctRWRpdG9yQ29uZmlnLmh0bWxcblx0ICogdG8gbGVhcm4gbW9yZS5cblx0ICovXG5cdEBJbnB1dCgpIHB1YmxpYyBjb25maWc6IENLRWRpdG9yNS5Db25maWcgPSB7fTtcblxuXHQvKipcblx0ICogVGhlIGluaXRpYWwgZGF0YSBvZiB0aGUgZWRpdG9yLiBVc2VmdWwgd2hlbiBub3QgdXNpbmcgdGhlIG5nTW9kZWwuXG5cdCAqIFNlZSBodHRwczovL2FuZ3VsYXIuaW8vYXBpL2Zvcm1zL05nTW9kZWwgdG8gbGVhcm4gbW9yZS5cblx0ICovXG5cdEBJbnB1dCgpIHB1YmxpYyBkYXRhID0gJyc7XG5cblx0LyoqXG5cdCAqIFRhZyBuYW1lIG9mIHRoZSBlZGl0b3IgY29tcG9uZW50LlxuXHQgKlxuXHQgKiBUaGUgZGVmYXVsdCB0YWcgaXMgJ2RpdicuXG5cdCAqL1xuXHRASW5wdXQoKSBwdWJsaWMgdGFnTmFtZSA9ICdkaXYnO1xuXG5cdC8qKlxuXHQgKiBUaGUgY29udGV4dCB3YXRjaGRvZy5cblx0ICovXG5cdEBJbnB1dCgpIHB1YmxpYyB3YXRjaGRvZz86IENLRWRpdG9yNS5Db250ZXh0V2F0Y2hkb2c7XG5cblx0LyoqXG5cdCAqIFdoZW4gc2V0IGB0cnVlYCwgdGhlIGVkaXRvciBiZWNvbWVzIHJlYWQtb25seS5cblx0ICogU2VlIGh0dHBzOi8vY2tlZGl0b3IuY29tL2RvY3MvY2tlZGl0b3I1L2xhdGVzdC9hcGkvbW9kdWxlX2NvcmVfZWRpdG9yX2VkaXRvci1FZGl0b3IuaHRtbCNtZW1iZXItaXNSZWFkT25seVxuXHQgKiB0byBsZWFybiBtb3JlLlxuXHQgKi9cblx0QElucHV0KCkgcHVibGljIHNldCBkaXNhYmxlZCggaXNEaXNhYmxlZDogYm9vbGVhbiApIHtcblx0XHR0aGlzLnNldERpc2FibGVkU3RhdGUoIGlzRGlzYWJsZWQgKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG5cdFx0aWYgKCB0aGlzLmVkaXRvckluc3RhbmNlICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWRpdG9ySW5zdGFuY2UuaXNSZWFkT25seTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5pbml0aWFsbHlEaXNhYmxlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBGaXJlcyB3aGVuIHRoZSBlZGl0b3IgaXMgcmVhZHkuIEl0IGNvcnJlc3BvbmRzIHdpdGggdGhlIGBlZGl0b3IjcmVhZHlgXG5cdCAqIGh0dHBzOi8vY2tlZGl0b3IuY29tL2RvY3MvY2tlZGl0b3I1L2xhdGVzdC9hcGkvbW9kdWxlX2NvcmVfZWRpdG9yX2VkaXRvci1FZGl0b3IuaHRtbCNldmVudC1yZWFkeVxuXHQgKiBldmVudC5cblx0ICovXG5cdEBPdXRwdXQoKSBwdWJsaWMgcmVhZHkgPSBuZXcgRXZlbnRFbWl0dGVyPENLRWRpdG9yNS5FZGl0b3I+KCk7XG5cblx0LyoqXG5cdCAqIEZpcmVzIHdoZW4gdGhlIGNvbnRlbnQgb2YgdGhlIGVkaXRvciBoYXMgY2hhbmdlZC4gSXQgY29ycmVzcG9uZHMgd2l0aCB0aGUgYGVkaXRvci5tb2RlbC5kb2N1bWVudCNjaGFuZ2VgXG5cdCAqIGh0dHBzOi8vY2tlZGl0b3IuY29tL2RvY3MvY2tlZGl0b3I1L2xhdGVzdC9hcGkvbW9kdWxlX2VuZ2luZV9tb2RlbF9kb2N1bWVudC1Eb2N1bWVudC5odG1sI2V2ZW50LWNoYW5nZVxuXHQgKiBldmVudC5cblx0ICovXG5cdEBPdXRwdXQoKSBwdWJsaWMgY2hhbmdlOiBFdmVudEVtaXR0ZXI8Q2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxDaGFuZ2VFdmVudD4oKTtcblxuXHQvKipcblx0ICogRmlyZXMgd2hlbiB0aGUgZWRpdGluZyB2aWV3IG9mIHRoZSBlZGl0b3IgaXMgYmx1cnJlZC4gSXQgY29ycmVzcG9uZHMgd2l0aCB0aGUgYGVkaXRvci5lZGl0aW5nLnZpZXcuZG9jdW1lbnQjYmx1cmBcblx0ICogaHR0cHM6Ly9ja2VkaXRvci5jb20vZG9jcy9ja2VkaXRvcjUvbGF0ZXN0L2FwaS9tb2R1bGVfZW5naW5lX3ZpZXdfZG9jdW1lbnQtRG9jdW1lbnQuaHRtbCNldmVudC1ldmVudDpibHVyXG5cdCAqIGV2ZW50LlxuXHQgKi9cblx0QE91dHB1dCgpIHB1YmxpYyBibHVyOiBFdmVudEVtaXR0ZXI8Qmx1ckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Qmx1ckV2ZW50PigpO1xuXG5cdC8qKlxuXHQgKiBGaXJlcyB3aGVuIHRoZSBlZGl0aW5nIHZpZXcgb2YgdGhlIGVkaXRvciBpcyBmb2N1c2VkLiBJdCBjb3JyZXNwb25kcyB3aXRoIHRoZSBgZWRpdG9yLmVkaXRpbmcudmlldy5kb2N1bWVudCNmb2N1c2Bcblx0ICogaHR0cHM6Ly9ja2VkaXRvci5jb20vZG9jcy9ja2VkaXRvcjUvbGF0ZXN0L2FwaS9tb2R1bGVfZW5naW5lX3ZpZXdfZG9jdW1lbnQtRG9jdW1lbnQuaHRtbCNldmVudC1ldmVudDpmb2N1c1xuXHQgKiBldmVudC5cblx0ICovXG5cdEBPdXRwdXQoKSBwdWJsaWMgZm9jdXM6IEV2ZW50RW1pdHRlcjxGb2N1c0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcblxuXHQvKipcblx0ICogRmlyZXMgd2hlbiB0aGUgZWRpdG9yIGNvbXBvbmVudCBjcmFzaGVzLlxuXHQgKi9cblx0QE91dHB1dCgpIHB1YmxpYyBlcnJvcjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG5cdC8qKlxuXHQgKiBUaGUgaW5zdGFuY2Ugb2YgdGhlIGVkaXRvciBjcmVhdGVkIGJ5IHRoaXMgY29tcG9uZW50LlxuXHQgKi9cblx0cHVibGljIGdldCBlZGl0b3JJbnN0YW5jZSgpOiBDS0VkaXRvcjUuRWRpdG9yIHwgbnVsbCB7XG5cdFx0bGV0IGVkaXRvcldhdGNoZG9nID0gdGhpcy5lZGl0b3JXYXRjaGRvZztcblxuXHRcdGlmICggdGhpcy53YXRjaGRvZyApIHtcblx0XHRcdC8vIFRlbXBvcmFyaWx5IHVzZSB0aGUgYF93YXRjaGRvZ3NgIGludGVybmFsIG1hcCBhcyB0aGUgYGdldEl0ZW0oKWAgbWV0aG9kIHRocm93c1xuXHRcdFx0Ly8gYW4gZXJyb3Igd2hlbiB0aGUgaXRlbSBpcyBub3QgcmVnaXN0ZXJlZCB5ZXQuXG5cdFx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2NrZWRpdG9yL2NrZWRpdG9yNS1hbmd1bGFyL2lzc3Vlcy8xNzcuXG5cdFx0XHRlZGl0b3JXYXRjaGRvZyA9IHRoaXMud2F0Y2hkb2cuX3dhdGNoZG9ncy5nZXQoIHRoaXMuaWQgKTtcblx0XHR9XG5cblx0XHRpZiAoIGVkaXRvcldhdGNoZG9nICkge1xuXHRcdFx0cmV0dXJuIGVkaXRvcldhdGNoZG9nLmVkaXRvcjtcblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgZWRpdG9yIHdhdGNoZG9nLiBJdCBpcyBjcmVhdGVkIHdoZW4gdGhlIGNvbnRleHQgd2F0Y2hkb2cgaXMgbm90IHBhc3NlZCB0byB0aGUgY29tcG9uZW50LlxuXHQgKiBJdCBrZWVwcyB0aGUgZWRpdG9yIHJ1bm5pbmcuXG5cdCAqL1xuXHRwcml2YXRlIGVkaXRvcldhdGNoZG9nPzogQ0tFZGl0b3I1LkVkaXRvcldhdGNoZG9nO1xuXG5cdC8qKlxuXHQgKiBJZiB0aGUgY29tcG9uZW50IGlzIHJlYWTigJNvbmx5IGJlZm9yZSB0aGUgZWRpdG9yIGluc3RhbmNlIGlzIGNyZWF0ZWQsIGl0IHJlbWVtYmVycyB0aGF0IHN0YXRlLFxuXHQgKiBzbyB0aGUgZWRpdG9yIGNhbiBiZWNvbWUgcmVhZOKAk29ubHkgb25jZSBpdCBpcyByZWFkeS5cblx0ICovXG5cdHByaXZhdGUgaW5pdGlhbGx5RGlzYWJsZWQgPSBmYWxzZTtcblxuXHQvKipcblx0ICogQW4gaW5zdGFuY2Ugb2YgaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9jb3JlL05nWm9uZSB0byBhbGxvdyB0aGUgaW50ZXJhY3Rpb24gd2l0aCB0aGUgZWRpdG9yXG5cdCAqIHdpdGhpbmcgdGhlIEFuZ3VsYXIgZXZlbnQgbG9vcC5cblx0ICovXG5cdHByaXZhdGUgbmdab25lOiBOZ1pvbmU7XG5cblx0LyoqXG5cdCAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgd2hlbiB0aGUgY29udGVudCBvZiB0aGUgZWRpdG9yIGNoYW5nZXMuIFBhcnQgb2YgdGhlXG5cdCAqIGBDb250cm9sVmFsdWVBY2Nlc3NvcmAgKGh0dHBzOi8vYW5ndWxhci5pby9hcGkvZm9ybXMvQ29udHJvbFZhbHVlQWNjZXNzb3IpIGludGVyZmFjZS5cblx0ICpcblx0ICogTm90ZTogVW5zZXQgdW5sZXNzIHRoZSBjb21wb25lbnQgdXNlcyB0aGUgYG5nTW9kZWxgLlxuXHQgKi9cblx0cHJpdmF0ZSBjdmFPbkNoYW5nZT86ICggZGF0YTogc3RyaW5nICkgPT4gdm9pZDtcblxuXHQvKipcblx0ICogQSBjYWxsYmFjayBleGVjdXRlZCB3aGVuIHRoZSBlZGl0b3IgaGFzIGJlZW4gYmx1cnJlZC4gUGFydCBvZiB0aGVcblx0ICogYENvbnRyb2xWYWx1ZUFjY2Vzc29yYCAoaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9mb3Jtcy9Db250cm9sVmFsdWVBY2Nlc3NvcikgaW50ZXJmYWNlLlxuXHQgKlxuXHQgKiBOb3RlOiBVbnNldCB1bmxlc3MgdGhlIGNvbXBvbmVudCB1c2VzIHRoZSBgbmdNb2RlbGAuXG5cdCAqL1xuXHRwcml2YXRlIGN2YU9uVG91Y2hlZD86ICgpID0+IHZvaWQ7XG5cblx0LyoqXG5cdCAqIFJlZmVyZW5jZSB0byB0aGUgc291cmNlIGVsZW1lbnQgdXNlZCBieSB0aGUgZWRpdG9yLlxuXHQgKi9cblx0cHJpdmF0ZSBlZGl0b3JFbGVtZW50PzogSFRNTEVsZW1lbnQ7XG5cblx0LyoqXG5cdCAqIEEgbG9jayBmbGFnIHByZXZlbnRpbmcgZnJvbSBjYWxsaW5nIHRoZSBgY3ZhT25DaGFuZ2UoKWAgZHVyaW5nIHNldHRpbmcgZWRpdG9yIGRhdGEuXG5cdCAqL1xuXHRwcml2YXRlIGlzRWRpdG9yU2V0dGluZ0RhdGEgPSBmYWxzZTtcblxuXHRwcml2YXRlIGlkID0gdWlkKCk7XG5cblx0cHVibGljIGNvbnN0cnVjdG9yKCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBuZ1pvbmU6IE5nWm9uZSApIHtcblx0XHR0aGlzLm5nWm9uZSA9IG5nWm9uZTtcblx0XHR0aGlzLmVsZW1lbnRSZWYgPSBlbGVtZW50UmVmO1xuXHR9XG5cblx0Ly8gSW1wbGVtZW50aW5nIHRoZSBBZnRlclZpZXdJbml0IGludGVyZmFjZS5cblx0cHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcblx0XHR0aGlzLmF0dGFjaFRvV2F0Y2hkb2coKTtcblx0fVxuXG5cdC8vIEltcGxlbWVudGluZyB0aGUgT25EZXN0cm95IGludGVyZmFjZS5cblx0cHVibGljIGFzeW5jIG5nT25EZXN0cm95KCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGlmICggdGhpcy53YXRjaGRvZyApIHtcblx0XHRcdGF3YWl0IHRoaXMud2F0Y2hkb2cucmVtb3ZlKCB0aGlzLmlkICk7XG5cdFx0fSBlbHNlIGlmICggdGhpcy5lZGl0b3JXYXRjaGRvZyAmJiB0aGlzLmVkaXRvcldhdGNoZG9nLmVkaXRvciApIHtcblx0XHRcdGF3YWl0IHRoaXMuZWRpdG9yV2F0Y2hkb2cuZGVzdHJveSgpO1xuXG5cdFx0XHR0aGlzLmVkaXRvcldhdGNoZG9nID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cdC8vIEltcGxlbWVudGluZyB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlIChvbmx5IHdoZW4gYmluZGluZyB0byBuZ01vZGVsKS5cblx0cHVibGljIHdyaXRlVmFsdWUoIHZhbHVlOiBzdHJpbmcgfCBudWxsICk6IHZvaWQge1xuXHRcdC8vIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCB3aXRoIHRoZSBgbnVsbGAgdmFsdWUgd2hlbiB0aGUgZm9ybSByZXNldHMuXG5cdFx0Ly8gQSBjb21wb25lbnQncyByZXNwb25zaWJpbGl0eSBpcyB0byByZXN0b3JlIHRvIHRoZSBpbml0aWFsIHN0YXRlLlxuXHRcdGlmICggdmFsdWUgPT09IG51bGwgKSB7XG5cdFx0XHR2YWx1ZSA9ICcnO1xuXHRcdH1cblxuXHRcdC8vIElmIGFscmVhZHkgaW5pdGlhbGl6ZWQuXG5cdFx0aWYgKCB0aGlzLmVkaXRvckluc3RhbmNlICkge1xuXHRcdFx0Ly8gVGhlIGxvY2sgbWVjaGFuaXNtIHByZXZlbnRzIGZyb20gY2FsbGluZyBgY3ZhT25DaGFuZ2UoKWAgZHVyaW5nIGNoYW5naW5nXG5cdFx0XHQvLyB0aGUgZWRpdG9yIHN0YXRlLiBTZWUgIzEzOVxuXHRcdFx0dGhpcy5pc0VkaXRvclNldHRpbmdEYXRhID0gdHJ1ZTtcblx0XHRcdHRoaXMuZWRpdG9ySW5zdGFuY2Uuc2V0RGF0YSggdmFsdWUgKTtcblx0XHRcdHRoaXMuaXNFZGl0b3JTZXR0aW5nRGF0YSA9IGZhbHNlO1xuXHRcdH1cblx0XHQvLyBJZiBub3QsIHdhaXQgZm9yIGl0IHRvIGJlIHJlYWR5OyBzdG9yZSB0aGUgZGF0YS5cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMuZGF0YSA9IHZhbHVlO1xuXG5cdFx0XHQvLyBJZiB0aGUgZWRpdG9yIGVsZW1lbnQgaXMgYWxyZWFkeSBhdmFpbGFibGUsIHRoZW4gdXBkYXRlIGl0cyBjb250ZW50LlxuXHRcdFx0Ly8gSWYgdGhlIG5nTW9kZWwgaXMgdXNlZCB0aGVuIHRoZSBlZGl0b3IgZWxlbWVudCBzaG91bGQgYmUgdXBkYXRlZCBkaXJlY3RseSBoZXJlLlxuXHRcdFx0aWYgKCB0aGlzLmVkaXRvckVsZW1lbnQgKSB7XG5cdFx0XHRcdHRoaXMuZWRpdG9yRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmRhdGE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gSW1wbGVtZW50aW5nIHRoZSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UgKG9ubHkgd2hlbiBiaW5kaW5nIHRvIG5nTW9kZWwpLlxuXHRwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZSggY2FsbGJhY2s6ICggZGF0YTogc3RyaW5nICkgPT4gdm9pZCApOiB2b2lkIHtcblx0XHR0aGlzLmN2YU9uQ2hhbmdlID0gY2FsbGJhY2s7XG5cdH1cblxuXHQvLyBJbXBsZW1lbnRpbmcgdGhlIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZSAob25seSB3aGVuIGJpbmRpbmcgdG8gbmdNb2RlbCkuXG5cdHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZCggY2FsbGJhY2s6ICgpID0+IHZvaWQgKTogdm9pZCB7XG5cdFx0dGhpcy5jdmFPblRvdWNoZWQgPSBjYWxsYmFjaztcblx0fVxuXG5cdC8vIEltcGxlbWVudGluZyB0aGUgQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlIChvbmx5IHdoZW4gYmluZGluZyB0byBuZ01vZGVsKS5cblx0cHVibGljIHNldERpc2FibGVkU3RhdGUoIGlzRGlzYWJsZWQ6IGJvb2xlYW4gKTogdm9pZCB7XG5cdFx0Ly8gSWYgYWxyZWFkeSBpbml0aWFsaXplZC5cblx0XHRpZiAoIHRoaXMuZWRpdG9ySW5zdGFuY2UgKSB7XG5cdFx0XHR0aGlzLmVkaXRvckluc3RhbmNlLmlzUmVhZE9ubHkgPSBpc0Rpc2FibGVkO1xuXHRcdH1cblxuXHRcdC8vIFN0b3JlIHRoZSBzdGF0ZSBhbnl3YXkgdG8gdXNlIGl0IG9uY2UgdGhlIGVkaXRvciBpcyBjcmVhdGVkLlxuXHRcdHRoaXMuaW5pdGlhbGx5RGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgdGhlIGVkaXRvciBpbnN0YW5jZSwgc2V0cyBpbml0aWFsIGVkaXRvciBkYXRhLCB0aGVuIGludGVncmF0ZXNcblx0ICogdGhlIGVkaXRvciB3aXRoIHRoZSBBbmd1bGFyIGNvbXBvbmVudC4gVGhpcyBtZXRob2QgZG9lcyBub3QgdXNlIHRoZSBgZWRpdG9yLnNldERhdGEoKWBcblx0ICogYmVjYXVzZSBvZiB0aGUgaXNzdWUgaW4gdGhlIGNvbGxhYm9yYXRpb24gbW9kZSAoIzYpLlxuXHQgKi9cblx0cHJpdmF0ZSBhdHRhY2hUb1dhdGNoZG9nKCkge1xuXHRcdGNvbnN0IGNyZWF0b3IgPSBhc3luYyAoIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWc6IENLRWRpdG9yNS5Db25maWcgKSA9PiB7XG5cdFx0XHRyZXR1cm4gdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoIGFzeW5jICgpID0+IHtcblx0XHRcdFx0dGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcblxuXHRcdFx0XHRjb25zdCBlZGl0b3IgPSBhd2FpdCB0aGlzLmVkaXRvciEuY3JlYXRlKCBlbGVtZW50LCBjb25maWcgKTtcblxuXHRcdFx0XHRpZiAoIHRoaXMuaW5pdGlhbGx5RGlzYWJsZWQgKSB7XG5cdFx0XHRcdFx0ZWRpdG9yLmlzUmVhZE9ubHkgPSB0aGlzLmluaXRpYWxseURpc2FibGVkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5uZ1pvbmUucnVuKCAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5yZWFkeS5lbWl0KCBlZGl0b3IgKTtcblx0XHRcdFx0fSApO1xuXG5cdFx0XHRcdHRoaXMuc2V0VXBFZGl0b3JFdmVudHMoIGVkaXRvciApO1xuXG5cdFx0XHRcdHJldHVybiBlZGl0b3I7XG5cdFx0XHR9ICk7XG5cdFx0fTtcblxuXHRcdGNvbnN0IGRlc3RydWN0b3IgPSBhc3luYyAoIGVkaXRvcjogQ0tFZGl0b3I1LkVkaXRvciApID0+IHtcblx0XHRcdGF3YWl0IGVkaXRvci5kZXN0cm95KCk7XG5cblx0XHRcdHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnJlbW92ZUNoaWxkKCB0aGlzLmVkaXRvckVsZW1lbnQhICk7XG5cdFx0fTtcblxuXHRcdGNvbnN0IGVtaXRFcnJvciA9ICgpID0+IHtcblx0XHRcdHRoaXMubmdab25lLnJ1biggKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmVycm9yLmVtaXQoKTtcblx0XHRcdH0gKTtcblx0XHR9O1xuXG5cdFx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIHRoaXMudGFnTmFtZSApO1xuXHRcdGNvbnN0IGNvbmZpZyA9IHRoaXMuZ2V0Q29uZmlnKCk7XG5cblx0XHR0aGlzLmVkaXRvckVsZW1lbnQgPSBlbGVtZW50O1xuXG5cdFx0Ly8gQmFzZWQgb24gdGhlIHByZXNlbmNlIG9mIHRoZSB3YXRjaGRvZyBkZWNpZGUgaG93IHRvIGluaXRpYWxpemUgdGhlIGVkaXRvci5cblx0XHRpZiAoIHRoaXMud2F0Y2hkb2cgKSB7XG5cdFx0XHQvLyBXaGVuIHRoZSBjb250ZXh0IHdhdGNoZG9nIGlzIHBhc3NlZCBhZGQgdGhlIG5ldyBpdGVtIHRvIGl0IGJhc2VkIG9uIHRoZSBwYXNzZWQgY29uZmlndXJhdGlvbi5cblx0XHRcdHRoaXMud2F0Y2hkb2cuYWRkKCB7XG5cdFx0XHRcdGlkOiB0aGlzLmlkLFxuXHRcdFx0XHR0eXBlOiAnZWRpdG9yJyxcblx0XHRcdFx0Y3JlYXRvcixcblx0XHRcdFx0ZGVzdHJ1Y3Rvcixcblx0XHRcdFx0c291cmNlRWxlbWVudE9yRGF0YTogZWxlbWVudCxcblx0XHRcdFx0Y29uZmlnXG5cdFx0XHR9ICk7XG5cblx0XHRcdHRoaXMud2F0Y2hkb2cub24oICdpdGVtRXJyb3InLCAoIF8sIHsgaXRlbUlkIH0gKSA9PiB7XG5cdFx0XHRcdGlmICggaXRlbUlkID09PSB0aGlzLmlkICkge1xuXHRcdFx0XHRcdGVtaXRFcnJvcigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEluIHRoZSBvdGhlciBjYXNlIGNyZWF0ZSB0aGUgd2F0Y2hkb2cgYnkgaGFuZCB0byBrZWVwIHRoZSBlZGl0b3IgcnVubmluZy5cblx0XHRcdGNvbnN0IGVkaXRvcldhdGNoZG9nOiBDS0VkaXRvcjUuRWRpdG9yV2F0Y2hkb2cgPSBuZXcgRWRpdG9yV2F0Y2hkb2coIHRoaXMuZWRpdG9yICk7XG5cblx0XHRcdGVkaXRvcldhdGNoZG9nLnNldENyZWF0b3IoIGNyZWF0b3IgKTtcblx0XHRcdGVkaXRvcldhdGNoZG9nLnNldERlc3RydWN0b3IoIGRlc3RydWN0b3IgKTtcblx0XHRcdGVkaXRvcldhdGNoZG9nLm9uKCAnZXJyb3InLCBlbWl0RXJyb3IgKTtcblxuXHRcdFx0dGhpcy5lZGl0b3JXYXRjaGRvZyA9IGVkaXRvcldhdGNoZG9nO1xuXG5cdFx0XHR0aGlzLmVkaXRvcldhdGNoZG9nLmNyZWF0ZSggZWxlbWVudCwgY29uZmlnICk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBnZXRDb25maWcoKSB7XG5cdFx0aWYgKCB0aGlzLmRhdGEgJiYgdGhpcy5jb25maWcuaW5pdGlhbERhdGEgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoICdFZGl0b3IgZGF0YSBzaG91bGQgYmUgcHJvdmlkZWQgZWl0aGVyIHVzaW5nIGBjb25maWcuaW5pdGlhbERhdGFgIG9yIGBkYXRhYCBwcm9wZXJ0aWVzLicgKTtcblx0XHR9XG5cblx0XHQvLyBNZXJnZSB0d28gcG9zc2libGUgd2F5cyBvZiBwcm92aWRpbmcgZGF0YSBpbnRvIHRoZSBgY29uZmlnLmluaXRpYWxEYXRhYCBmaWVsZC5cblx0XHRyZXR1cm4ge1xuXHRcdFx0Li4udGhpcy5jb25maWcsXG5cdFx0XHRpbml0aWFsRGF0YTogdGhpcy5jb25maWcuaW5pdGlhbERhdGEgfHwgdGhpcy5kYXRhIHx8ICcnXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbnRlZ3JhdGVzIHRoZSBlZGl0b3Igd2l0aCB0aGUgY29tcG9uZW50IGJ5IGF0dGFjaGluZyByZWxhdGVkIGV2ZW50IGxpc3RlbmVycy5cblx0ICovXG5cdHByaXZhdGUgc2V0VXBFZGl0b3JFdmVudHMoIGVkaXRvcjogQ0tFZGl0b3I1LkVkaXRvciApOiB2b2lkIHtcblx0XHRjb25zdCBtb2RlbERvY3VtZW50ID0gZWRpdG9yLm1vZGVsLmRvY3VtZW50O1xuXHRcdGNvbnN0IHZpZXdEb2N1bWVudCA9IGVkaXRvci5lZGl0aW5nLnZpZXcuZG9jdW1lbnQ7XG5cblx0XHRtb2RlbERvY3VtZW50Lm9uKCAnY2hhbmdlOmRhdGEnLCAoIGV2dDogQ0tFZGl0b3I1LkV2ZW50SW5mbzwnY2hhbmdlOmRhdGEnPiApID0+IHtcblx0XHRcdHRoaXMubmdab25lLnJ1biggKCkgPT4ge1xuXHRcdFx0XHRpZiAoIHRoaXMuY3ZhT25DaGFuZ2UgJiYgIXRoaXMuaXNFZGl0b3JTZXR0aW5nRGF0YSApIHtcblx0XHRcdFx0XHRjb25zdCBkYXRhID0gZWRpdG9yLmdldERhdGEoKTtcblxuXHRcdFx0XHRcdHRoaXMuY3ZhT25DaGFuZ2UoIGRhdGEgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuY2hhbmdlLmVtaXQoIHsgZXZlbnQ6IGV2dCwgZWRpdG9yIH0gKTtcblx0XHRcdH0gKTtcblx0XHR9ICk7XG5cblx0XHR2aWV3RG9jdW1lbnQub24oICdmb2N1cycsICggZXZ0OiBDS0VkaXRvcjUuRXZlbnRJbmZvPCdmb2N1cyc+ICkgPT4ge1xuXHRcdFx0dGhpcy5uZ1pvbmUucnVuKCAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuZm9jdXMuZW1pdCggeyBldmVudDogZXZ0LCBlZGl0b3IgfSApO1xuXHRcdFx0fSApO1xuXHRcdH0gKTtcblxuXHRcdHZpZXdEb2N1bWVudC5vbiggJ2JsdXInLCAoIGV2dDogQ0tFZGl0b3I1LkV2ZW50SW5mbzwnYmx1cic+ICkgPT4ge1xuXHRcdFx0dGhpcy5uZ1pvbmUucnVuKCAoKSA9PiB7XG5cdFx0XHRcdGlmICggdGhpcy5jdmFPblRvdWNoZWQgKSB7XG5cdFx0XHRcdFx0dGhpcy5jdmFPblRvdWNoZWQoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuYmx1ci5lbWl0KCB7IGV2ZW50OiBldnQsIGVkaXRvciB9ICk7XG5cdFx0XHR9ICk7XG5cdFx0fSApO1xuXHR9XG59XG4iXX0=