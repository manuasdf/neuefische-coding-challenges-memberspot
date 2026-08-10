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

type Difficulty = "easy" | "moderate" | "hard";
type Filter = {
    region: string | undefined,
    difficulty: Difficulty | undefined
}

const DEBUG = process.env.DEBUG || false;

function slugify(title: string): string {
    return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const SQLTemplateGetAllTrails = `
    SELECT 
        trails.id,
        trails.region_id,
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

async function getAllTrailsApplyFilter(filter: Filter): Promise<Trail[]> {
    let trails: Trail[] = [];
    try {
        const db = getDB();
        const filterArray: string[] = [];
        const filterParams: Record<string, any> = {};
        let filterString: string = "";
        if (filter.region) {
            filterArray.push(`regions_slug = @region_slug`);
            filterParams["@region_slug"] = filter.region;
        }
        if (filter.difficulty) {
            filterArray.push(`trails.difficulty = @difficulty`)
            filterParams["@difficulty"] = filter.difficulty;
        }
        if (filterArray.length > 0)
            filterString = "WHERE " + filterArray.join(" AND ");
        trails = await db.all<Trail[]>(SQLTemplateGetAllTrails + filterString, filterParams);
    } catch (err) {
        if (DEBUG) {
            console.error(`Fetch filtered trail data failed:`, err)
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

async function getTrailById(id: number): Promise<Trail | undefined> {
    let trail:Trail | undefined = undefined;
    try {
        const db = getDB();
        trail = await db.get<Trail>(SQLTemplateGetAllTrails + `
            WHERE
                trails.id = ?
            `, [id]);
    } catch (err) {
        if (DEBUG) {
            console.error(`Fetch trail data failed:`, err)
            throw err;
        }
    }
    return trail;
}

async function addTrail(trail: Trail): Promise<number> {
  const db = getDB();
  const result = await db.run(
    `INSERT INTO 
        trails 
    (
        region_id, 
        title, 
        slug, 
        difficulty, 
        distance_km, 
        description, 
        image_url, 
        created_at
    )
     VALUES (
        @region_id,
        @title,
        @slug,
        @difficulty,
        @distance_km,
        @description,
        @image_url,
        @created_at
    )`,
    {
        "@region_id": trail.region_id,
        "@title": trail.title,
        "@slug": slugify(trail.title),
        "@difficulty": trail.difficulty,
        "@distance_km": trail.distance_km,
        "@description": trail.description,
        "@image_url": trail.image_url,
        "@created_at": Date.now(),
    },
  );
  return result.lastID!;
}

async function updateTrail(id: number, trail: Trail): Promise<number> {
  const db = getDB();
  const result = await db.run(
    `UPDATE 
        trails
    SET
        region_id = @region_id, 
        title = @title, 
        slug = @slug, 
        difficulty = @difficulty, 
        distance_km = @distance_km, 
        description = @description, 
        image_url = @image_url, 
        created_at = @created_at
    WHERE
        id = @id`,
    {
        "@region_id": trail.region_id,
        "@title": trail.title,
        "@slug": slugify(trail.title),
        "@difficulty": trail.difficulty,
        "@distance_km": trail.distance_km,
        "@description": trail.description,
        "@image_url": trail.image_url,
        "@created_at": Date.now(),
        "@id": id,
    },
  );
  return result.changes!;
}

async function deleteTrail(id: number): Promise<number> {
    const db = getDB();
    const result = await db.run(`DELETE FROM trails WHERE id = @id`, { "@id": id });
    return result.changes!;
}

export {
    getAllTrails,
    getAllTrailsApplyFilter,
    getTrailBySlug,
    getTrailsByRegionId,
    getTrailById,
    addTrail,
    updateTrail,
    deleteTrail
}

export type { 
    Difficulty,
    Filter
}