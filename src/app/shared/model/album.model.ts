import { Photo } from "./photo.model";

export class Album {
    id?: number;
    name?: string;
    dataCreate?: Date;
    photos?: Photo[];
}