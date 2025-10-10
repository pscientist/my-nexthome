// utils/cloudinary.ts
export type CloudinaryUploadResult = {
    asset_id: string
    public_id: string
    secure_url: string
    width: number
    height: number
    bytes: number
    [k: string]: any
}

/** Unsigned upload (safe for client if preset is restricted) */
export async function uploadToCloudinary(opts: {
    fileUri: string
    folder: string
    preset?: string
    cloudName?: string
}): Promise<CloudinaryUploadResult> {

    const cloudName = "dj1sitbx0";
    const uploadPreset = "uc9d4rhd"; // 

    const data = new FormData()
    // RN/Expo requires a file-like object with uri/type/name
    data.append('file', { uri: opts.fileUri, type: 'image/jpeg', name: 'upload.jpg' } as any);
    data.append('upload_preset', uploadPreset);
    data.append('folder', opts.folder);

    const img_url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const res = await fetch(img_url, {
        method: 'POST',
        body: data,
    });

    if (!res.ok) {
        const text = await res.text()
        throw new Error(`Cloudinary ${cloudName} upload failed: ${res.status} ${text}`)
    }
    return res.json()
}

/** Build a transformed CDN URL (smart format/quality + optional resize) */
export function cdnUrl(publicId: string, opts: { w?: number; h?: number; fit?: 'fill' | 'fit' | 'scale' } = {}) {
    const cloud = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME!
    const trans = [
        'f_auto',      // pick best format (webp/avif/jpg)
        'q_auto',      // auto quality
        opts.w ? `w_${opts.w}` : null,
        opts.h ? `h_${opts.h}` : null,
        opts.fit ? `c_${opts.fit}` : null,
    ].filter(Boolean).join(',')

    // Note: publicId already contains folder (e.g., "mynexthome/abc123")
    return `https://res.cloudinary.com/${cloud}/image/upload/${trans}/${publicId}`
}
