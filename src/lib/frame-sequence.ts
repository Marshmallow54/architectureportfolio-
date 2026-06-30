import fs from "fs";
import path from "path";
import { FRAME_FILE_PATTERN, FRAME_SEQUENCE_DIRS } from "@/data/frame-sequences";

export interface FrameSequenceData {
    frames: string[];
    frameCount: number;
    scrollHeightVh: number;
}

function parseFrameNumber(filename: string): number {
    const match = filename.match(/(\d+)/);
    return match ? Number.parseInt(match[1], 10) : 0;
}

export function getFrameSequenceForSlug(slug: string): FrameSequenceData | null {
    const assetDir = FRAME_SEQUENCE_DIRS[slug];
    if (!assetDir) return null;

    const absoluteDir = path.join(process.cwd(), "public", "assets", assetDir);

    if (!fs.existsSync(absoluteDir)) {
        return null;
    }

    const files = fs
        .readdirSync(absoluteDir)
        .filter((file) => FRAME_FILE_PATTERN.test(file))
        .sort((a, b) => parseFrameNumber(a) - parseFrameNumber(b));

    if (files.length === 0) {
        return null;
    }

    const frames = files.map((file) => `/assets/${assetDir}/${file}`);
    // ~2vh per frame — longer scroll distance = slower sequence playback
    const scrollHeightVh = Math.max(Math.round(files.length * 2), 240);
    return {
        frames,
        frameCount: files.length,
        scrollHeightVh,
    };
}

export function hasFrameSequence(slug: string): boolean {
    return getFrameSequenceForSlug(slug) !== null;
}
