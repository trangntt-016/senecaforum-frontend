import { Source } from './source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Skype source implementation.
 *  Fetch avatar source based on skype identifier
 */
export declare class Skype implements Source {
    sourceId: string;
    readonly sourceType: AvatarSource;
    constructor(sourceId: string);
    getAvatar(): string;
}
