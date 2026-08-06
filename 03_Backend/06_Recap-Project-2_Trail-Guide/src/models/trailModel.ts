import { getDB } from "./db";

interface Trail {
    id: number,
    region_id: number,
    title: string,
    slug: string,
    difficulty: Difficulty,
    distance_km: number,
    description: string,
    image_url: string,
    created_at: number,
    region_name: string,
    regions_slug?: string,
    region_country: string,
    regions_description?: string
}

type Difficulty = "small" | "medium" | "large";

const DEBUG = process.env.DEBUG || false;

const SQLTemplateGetAllTrails = `
    SELECT 
        trails.id,
        trails.title,
        trails.slug,
        trails.difficulty,
        trails.distance_km,
        trails.description,
        trails.image_url,
        trails.created_at,
        regions.name AS region_name, 
        regions.slug AS regions_slug,
        regions.country AS region_country, 
        regions.description AS regions_description
    FROM 
        trails
    INNER JOIN
        regions
    ON
        trails.region_id = regions.id
    `;

async function getAllTrails(): Promise<Trail[]> {
    let trails: Trail[] = [];
    try {
        const db = getDB();
        trails = await db.all<Trail[]>(SQLTemplateGetAllTrails);
    } catch (err) {
        if (DEBUG) {
            console.error(`Fetch trail data failed:`, err)
            throw err;
        }
    }
    return trails;
}

async function getTrailBySlug(slug: string): Promise<Trail | undefined> {
    let trail:Trail | undefined = undefined;
    try {
        const db = getDB();
        trail = await db.get<Trail>(SQLTemplateGetAllTrails + `
            WHERE
                trails.slug = ?
            `, [slug]);
    } catch (err) {
        if (DEBUG) {
            console.error(`Fetch trail data failed:`, err)
            throw err;
        }
    }
    return trail;
}

async function getTrailsByRegionId(regionId: string): Promise<Trail[]> {
    let trails: Trail[] = [];
    try {
        const db = getDB();
        trails = await db.all<Trail[]>(SQLTemplateGetAllTrails + `
            WHERE
                trails.region_id = ?
            `, [regionId]);
    } catch (err) {
        if (DEBUG) {
            console.error(`Fetch trail data failed:`, err)
            throw err;
        }
    }
    return trails;
}

export {
    getAllTrails,
    getTrailBySlug,
    getTrailsByRegionId
}