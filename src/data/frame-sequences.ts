export const COLLAGE_TO_REALITY_SLUG = "collage-to-reality";
export const VANBRUGH_PARK_ESTATE_SLUG = "vanbrugh-park-estate";
export const LITTLE_CUMBRAE_CASTLE_SLUG = "little-cumbrae-castle";

/** Maps project slug → folder under public/assets/ */
export const FRAME_SEQUENCE_DIRS: Record<string, string> = {
    [COLLAGE_TO_REALITY_SLUG]: "project-1",
    [VANBRUGH_PARK_ESTATE_SLUG]: "project-2",
    [LITTLE_CUMBRAE_CASTLE_SLUG]: "project-3",
};

export const FRAME_FILE_PATTERN = /^frame_\d+\.(webp|jpe?g)$/i;