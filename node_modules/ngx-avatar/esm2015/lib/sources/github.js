import { AsyncSource } from './async-source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  GitHub source implementation.
 *  Fetch avatar source based on github identifier
 */
export class Github extends AsyncSource {
    constructor(sourceId) {
        super(sourceId);
        this.sourceType = AvatarSource.GITHUB;
    }
    getAvatar() {
        return `https://api.github.com/users/${this.sourceId}`;
    }
    /**
     * extract github avatar from json data
     */
    processResponse(data, size) {
        if (size) {
            return `${data.avatar_url}&s=${size}`;
        }
        return data.avatar_url;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0aHViLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWF2YXRhci9zcmMvbGliL3NvdXJjZXMvZ2l0aHViLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLE1BQU8sU0FBUSxXQUFXO0lBR3JDLFlBQVksUUFBZ0I7UUFDMUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBSFQsZUFBVSxHQUFpQixZQUFZLENBQUMsTUFBTSxDQUFDO0lBSXhELENBQUM7SUFFTSxTQUFTO1FBQ2QsT0FBTyxnQ0FBZ0MsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3pELENBQUM7SUFFRDs7T0FFRztJQUNJLGVBQWUsQ0FBQyxJQUE0QixFQUFFLElBQWE7UUFDaEUsSUFBSSxJQUFJLEVBQUU7WUFDUixPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsTUFBTSxJQUFJLEVBQUUsQ0FBQztTQUN2QztRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc3luY1NvdXJjZSB9IGZyb20gJy4vYXN5bmMtc291cmNlJztcbmltcG9ydCB7IEF2YXRhclNvdXJjZSB9IGZyb20gJy4vYXZhdGFyLXNvdXJjZS5lbnVtJztcblxuLyoqXG4gKiAgR2l0SHViIHNvdXJjZSBpbXBsZW1lbnRhdGlvbi5cbiAqICBGZXRjaCBhdmF0YXIgc291cmNlIGJhc2VkIG9uIGdpdGh1YiBpZGVudGlmaWVyXG4gKi9cbmV4cG9ydCBjbGFzcyBHaXRodWIgZXh0ZW5kcyBBc3luY1NvdXJjZSB7XG4gIHJlYWRvbmx5IHNvdXJjZVR5cGU6IEF2YXRhclNvdXJjZSA9IEF2YXRhclNvdXJjZS5HSVRIVUI7XG5cbiAgY29uc3RydWN0b3Ioc291cmNlSWQ6IHN0cmluZykge1xuICAgIHN1cGVyKHNvdXJjZUlkKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBdmF0YXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvJHt0aGlzLnNvdXJjZUlkfWA7XG4gIH1cblxuICAvKipcbiAgICogZXh0cmFjdCBnaXRodWIgYXZhdGFyIGZyb20ganNvbiBkYXRhXG4gICAqL1xuICBwdWJsaWMgcHJvY2Vzc1Jlc3BvbnNlKGRhdGE6IHsgYXZhdGFyX3VybDogc3RyaW5nIH0sIHNpemU/OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGlmIChzaXplKSB7XG4gICAgICByZXR1cm4gYCR7ZGF0YS5hdmF0YXJfdXJsfSZzPSR7c2l6ZX1gO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YS5hdmF0YXJfdXJsO1xuICB9XG59XG4iXX0=