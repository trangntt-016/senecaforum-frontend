import { AsyncSource } from './async-source';
import { AvatarSource } from './avatar-source.enum';
export declare class Vkontakte extends AsyncSource {
    readonly sourceType: AvatarSource;
    constructor(sourceId: string);
    getAvatar(size: number): string;
    /**
     * extract vkontakte avatar from json data
     */
    processResponse(data: {
        response: {
            [key: string]: string;
        }[];
    }): string | null;
    /**
     * Returns image size related to vkontakte API
     */
    private getImageSize;
}
