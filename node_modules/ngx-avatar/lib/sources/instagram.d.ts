import { AsyncSource } from './async-source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Instagram source impelementation.
 *  Fetch avatar source based on instagram identifier
 */
export declare class Instagram extends AsyncSource {
    readonly sourceType: AvatarSource;
    constructor(sourceId: string);
    getAvatar(): string;
    /**
     * extract instagram avatar from json data
     */
    processResponse(data: {
        graphql: {
            user: {
                profile_pic_url_hd: string;
            };
        };
    }, size?: number): string;
}
