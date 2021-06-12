import { Source } from './source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Gravatar source implementation.
 *  Fetch avatar source based on gravatar email
 */
export declare class Gravatar implements Source {
    value: string;
    readonly sourceType: AvatarSource;
    sourceId: string;
    constructor(value: string);
    getAvatar(size: number): string;
}
