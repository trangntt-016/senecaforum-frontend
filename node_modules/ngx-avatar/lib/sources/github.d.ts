import { AsyncSource } from './async-source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  GitHub source implementation.
 *  Fetch avatar source based on github identifier
 */
export declare class Github extends AsyncSource {
    readonly sourceType: AvatarSource;
    constructor(sourceId: string);
    getAvatar(): string;
    /**
     * extract github avatar from json data
     */
    processResponse(data: {
        avatar_url: string;
    }, size?: number): string;
}
