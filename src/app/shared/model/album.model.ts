import { Photo } from "./photo.model";

export class Album {
    Id: number | undefined;
    Name: string | undefined;
    DataCreate: Date | undefined;
    Photos: Photo[] | undefined;
}