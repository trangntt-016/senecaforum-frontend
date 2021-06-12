import { Source } from './source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Twitter source implementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
export declare class Twitter implements Source {
    sourceId: string;
    readonly sourceType: AvatarSource;
    constructor(sourceId: string);
    getAvatar(size: number): string;
    private getImageSize;
}
