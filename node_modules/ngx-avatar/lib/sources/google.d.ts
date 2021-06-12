import { AsyncSource } from './async-source';
import { AvatarSource } from './avatar-source.enum';
/**
 *  Google source implementation.
 *  Fetch avatar source based on google identifier
 *  and image size
 */
export declare class Google extends AsyncSource {
    readonly sourceType: AvatarSource;
    constructor(sourceId: string);
    getAvatar(): string;
    /**
     * Extract google avatar from json data
     */
    processResponse(data: {
        entry: {
            gphoto$thumbnail: {
                $t: string;
            };
        };
    }, size?: number): string | null;
}
