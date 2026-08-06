import { getDB } from "./db";

interface Region {
    id: number,
    name: string,
    slug: string,
    country: string,
    description: string,
}

const DEBUG = process.env.DEBUG || false;

async function getAllRegions(): Promise<Region[]> {
    let region: Region[] = [];
    try {
        const db = getDB();
        region = await db.all<Region[]>(`
            SELECT 
                id, 
                name, 
                slug, 
                country, 
                description 
            FROM 
                regions
            `);
        return region;
    } catch (err) {
        if (DEBUG) {
            console.error(`Fetch region data failed:`, err)
            throw err;
        }
    }
    return region;
}

async function getRegionBySlug(slug: string): Promise<Region | undefined> {
    let region: Region | undefined = undefined;
    try {
        const db = getDB();
        region = await db.get<Region>(`
            SELECT 
                id, 
                name, 
                slug, 
                country, 
                description 
            FROM 
                regions
            WHERE
                slug = ?
            `, [slug]);
    } catch (err) {
        if (DEBUG) {
            console.error(`Fetch region data failed:`, err)
            throw err;
        }
    }
    return region;
}

export {
    getAllRegions,
    getRegionBySlug
}