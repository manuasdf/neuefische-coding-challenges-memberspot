interface Creature {
    name: string;
    useAbility(): void;
}

class Dragon implements Creature {
    name: "Dragon";
    useAbility() {
        console.log("Breathing fire.");
    }
}

class Phoenix implements Creature {
    name: "Phoenix";
    useAbility() {
        console.log("Reborn from fire.");
    }
}

class Unicorn implements Creature {
    name: "Unicorn";
    useAbility() {
        console.log("Dancing on rainbow.");
    }
}

interface SummoningCircle {
    summon(ingredientType: string): void;
}

type IngredientType = "fire" | "air" | "sparkles";

class DragonFactory implements SummoningCircle {
    summon(ingredientType: string): Create {
        return new Dragon();
    }
}

class PhoenixFactory implements SummoningCircle {
    summon(ingredientType: string): Create {
        return new Phoenix();
    }
}

class UnicornFactory implements SummoningCircle {
    summon(ingredientType: string): Create {
        return new Unicorn();
    }
}






export interface Decoder {
    decode(buffer: Buffer): AudioFrame[];
}

export function createDecoder(format: AudioFormat): Decoder {
    switch (format) {
        case "mp3":
            return new Mp3Decoder();
        case "flac":
            return new FlacDecoder();
        case "wav":
            return new WavDecoder();
        default:
            throw new Error(`Unsupported format: ${format}`);
    }
}

class Player {
    load(file: AudioFile) {
        const decoder = createDecoder(file.format);
        decoder.decode(file.buffer);
    }
}
