interface File {
    id: number;
    original_name: string;
    name: string;
    path: string;
    mime_type: string;
    extesion: string;
    size: number;
    down_count: number;
    description: string;
}

interface DataItem {
    id: number;
    name: string;
    file_title: string;
    code: string;
    file: File;
}

interface ApiResponse {
    status: boolean;
    data: DataItem[];
    message: string;
    token: string;
}

export { File, DataItem, ApiResponse };
