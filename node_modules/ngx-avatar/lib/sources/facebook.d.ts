import { Source } from './source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Facebook source implementation.
 *  Fetch avatar source based on facebook identifier
 *  and image size
 */
export declare class Facebook implements Source {
    sourceId: string;
    readonly sourceType: AvatarSource;
    constructor(sourceId: string);
    getAvatar(size: number): string;
}
