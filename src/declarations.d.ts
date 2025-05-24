// declarations.d.ts
declare module '@taghub/api' {
    interface LoginResponse {        
    }

    export interface Project {
        id: number;
        uuid: string;
    }

    export interface Item {
        id: number;
        epcString: string;
        "-4": string;
    }

    export function login(
        username: string, 
        password: string, 
        options?: { consumerKey: string; init: boolean }
    ): Promise<LoginResponse>;

    export function getProjects(): Promise<Project[]>;

    export function getItems(projectUuid: string): Promise<Item[]>;
}