export interface MediaSet {
    media: Media[]
    disclaimer: string
}

export interface Media {
    service: string
    connection: Connection[]
    kind: "thumbnails" | "video"
    type: string
    encoding: string
    expires: Date
    width?: string
    bitrate?: string
    height?: string
}

export interface Connection {
    priority: string
    authExpiresOffset: number
    dpw: string
    protocol: Protocol
    supplier: Supplier
    authExpires: Date
    href: string
    transferFormat: TransferFormat
}

export enum Protocol {
    HTTP = "http",
    HTTPS = "https",
}

export enum Supplier {
    MFAkamai = "mf_akamai",
    MFCloudfront = "mf_cloudfront",
}

export enum TransferFormat {
    Dash = "dash",
    HLS = "hls",
    Plain = "plain",
}
