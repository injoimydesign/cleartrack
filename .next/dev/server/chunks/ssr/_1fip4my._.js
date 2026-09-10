module.exports = [
"[project]/.next-internal/server/app/(admin)/songs/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/(admin)/songs/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "4070356a6278574845746c2b1b11cb3256587b91b8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSong"],
    "40c9f69e95a3b3dbb5f07c73aaf2b482a5c15b427c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteSong"],
    "40de3937b63a4e22d71e6051fece05a74b1b36f578",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteSongs"],
    "60d9beaddb27c6477459882b89abf66ede490b2370",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateSong"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$admin$292f$songs$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(admin)/songs/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/(admin)/songs/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(admin)/songs/actions.ts [app-rsc] (ecmascript)");
}),
"[project]/.next-internal/server/app/(admin)/songs/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/(admin)/songs/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(admin)/songs/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/src/app/(admin)/songs/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4070356a6278574845746c2b1b11cb3256587b91b8":{"name":"createSong"},"40c9f69e95a3b3dbb5f07c73aaf2b482a5c15b427c":{"name":"deleteSong"},"40de3937b63a4e22d71e6051fece05a74b1b36f578":{"name":"deleteSongs"},"60d9beaddb27c6477459882b89abf66ede490b2370":{"name":"updateSong"}},"src/app/(admin)/songs/actions.ts",""] */ __turbopack_context__.s([
    "createSong",
    ()=>createSong,
    "deleteSong",
    ()=>deleteSong,
    "deleteSongs",
    ()=>deleteSongs,
    "updateSong",
    ()=>updateSong
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/admin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
// PHASE 1 NOTE: these actions use the service-role admin client because
// there's no signed-in session yet (auth lands in Phase 6 — see
// src/lib/supabase/admin.ts for the swap-over plan). The *_write_admin RLS
// policies from migration 0001 already exist and will start actually
// gating these writes the moment this file switches to the session client.
function textOrNull(value) {
    const str = (value ?? "").toString().trim();
    return str.length > 0 ? str : null;
}
function parsePicked(raw) {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw.toString());
        if (!Array.isArray(parsed)) return [];
        return parsed.filter((v)=>v && typeof v.id === "string").map((v)=>({
                id: v.id,
                splitPercent: Number(v.splitPercent ?? 0)
            }));
    } catch  {
        return [];
    }
}
function parseIds(raw) {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw.toString());
        if (!Array.isArray(parsed)) return [];
        // Accept either a plain string-id array (artists) or {id, ...} objects.
        return parsed.map((v)=>typeof v === "string" ? v : v?.id).filter((v)=>typeof v === "string");
    } catch  {
        return [];
    }
}
// Replace-all sync for each song join table — simplest reliable approach
// for Phase 2. Revisit if catalogs get large enough that a full
// delete + reinsert on every save becomes a real cost (unlikely at scale).
async function syncSongArtists(songId, artistIds) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error: deleteError } = await supabase.from("song_artists").delete().eq("song_id", songId);
    if (deleteError) throw new Error(deleteError.message);
    if (artistIds.length === 0) return;
    const { error: insertError } = await supabase.from("song_artists").insert(artistIds.map((artist_id)=>({
            song_id: songId,
            artist_id
        })));
    if (insertError) throw new Error(insertError.message);
}
async function syncSongWriters(songId, picked) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error: deleteError } = await supabase.from("song_writers").delete().eq("song_id", songId);
    if (deleteError) throw new Error(deleteError.message);
    if (picked.length === 0) return;
    const { error: insertError } = await supabase.from("song_writers").insert(picked.map((p)=>({
            song_id: songId,
            writer_id: p.id,
            split_percent: p.splitPercent ?? 0
        })));
    if (insertError) throw new Error(insertError.message);
}
async function syncSongLabels(songId, picked) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error: deleteError } = await supabase.from("song_labels").delete().eq("song_id", songId);
    if (deleteError) throw new Error(deleteError.message);
    if (picked.length === 0) return;
    const { error: insertError } = await supabase.from("song_labels").insert(picked.map((p)=>({
            song_id: songId,
            label_id: p.id,
            split_percent: p.splitPercent ?? 0
        })));
    if (insertError) throw new Error(insertError.message);
}
async function createSong(formData) {
    const title = (formData.get("title") ?? "").toString().trim();
    if (!title) {
        throw new Error("Title is required.");
    }
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { data, error } = await supabase.from("songs").insert({
        title,
        cover_art_url: textOrNull(formData.get("cover_art_url")),
        notes: textOrNull(formData.get("notes")),
        publisher_id: textOrNull(formData.get("publisher_id")),
        spotify_track_id: textOrNull(formData.get("spotify_track_id"))
    }).select("id").single();
    if (error) {
        throw new Error(error.message);
    }
    await syncSongArtists(data.id, parseIds(formData.get("artist_ids")));
    await syncSongWriters(data.id, parsePicked(formData.get("writers_json")));
    await syncSongLabels(data.id, parsePicked(formData.get("labels_json")));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/songs");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/songs/${data.id}`);
}
async function updateSong(id, formData) {
    const title = (formData.get("title") ?? "").toString().trim();
    if (!title) {
        throw new Error("Title is required.");
    }
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error } = await supabase.from("songs").update({
        title,
        cover_art_url: textOrNull(formData.get("cover_art_url")),
        notes: textOrNull(formData.get("notes")),
        publisher_id: textOrNull(formData.get("publisher_id")),
        spotify_track_id: textOrNull(formData.get("spotify_track_id"))
    }).eq("id", id);
    if (error) {
        throw new Error(error.message);
    }
    await syncSongArtists(id, parseIds(formData.get("artist_ids")));
    await syncSongWriters(id, parsePicked(formData.get("writers_json")));
    await syncSongLabels(id, parsePicked(formData.get("labels_json")));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/songs");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/songs/${id}`);
}
async function deleteSong(id) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error } = await supabase.from("songs").delete().eq("id", id);
    if (error) {
        throw new Error(error.message);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/songs");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/songs");
}
async function deleteSongs(ids) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error } = await supabase.from("songs").delete().in("id", ids);
    if (error) {
        throw new Error(error.message);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/songs");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createSong,
    updateSong,
    deleteSong,
    deleteSongs
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createSong, "4070356a6278574845746c2b1b11cb3256587b91b8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateSong, "60d9beaddb27c6477459882b89abf66ede490b2370", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteSong, "40c9f69e95a3b3dbb5f07c73aaf2b482a5c15b427c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteSongs, "40de3937b63a4e22d71e6051fece05a74b1b36f578", null);
}),
"[project]/src/lib/supabase/admin.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdminClient",
    ()=>createAdminClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
;
;
function createAdminClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://fjdflxsckmyjcifctbob.supabase.co"), process.env.SUPABASE_SECRET_KEY, {
        auth: {
            persistSession: false
        }
    });
}
}),
];

//# sourceMappingURL=_1fip4my._.js.map