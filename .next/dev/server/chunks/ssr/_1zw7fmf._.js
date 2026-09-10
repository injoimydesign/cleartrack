module.exports = [
"[project]/.next-internal/server/app/(admin)/songs/new/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/(admin)/songs/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/(admin)/songs/spotify-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/app/(admin)/publishers/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/src/app/(admin)/labels/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/src/app/(admin)/writers/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/src/app/(admin)/artists/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "402c12142a5a760598ec7aab5e11fb0910053e6317",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$artists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createArtistInline"],
    "40641c1da16ac277d255b7978c6135ef881cea237e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$labels$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createLabelInline"],
    "4070356a6278574845746c2b1b11cb3256587b91b8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSong"],
    "409f1f1e1b7da6a6288c78d630c47a416611f98dcf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$publishers$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPublisherInline"],
    "40c9f69e95a3b3dbb5f07c73aaf2b482a5c15b427c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteSong"],
    "40d19583f35f35839d263965c09cff1fd4f4fa1159",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$writers$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createWriterInline"],
    "40de3937b63a4e22d71e6051fece05a74b1b36f578",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteSongs"],
    "604c0ad1147329a85acf33e42636cfe052cc62aeab",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$spotify$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchSpotifyCoverArt"],
    "60d9beaddb27c6477459882b89abf66ede490b2370",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateSong"],
    "60e9a895cfd0197da00de06a690d772539ab060466",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$spotify$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchSpotifyPublisher"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$admin$292f$songs$2f$new$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$spotify$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$admin$292f$publishers$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$admin$292f$labels$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$admin$292f$writers$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$admin$292f$artists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(admin)/songs/new/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/(admin)/songs/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/app/(admin)/songs/spotify-actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/src/app/(admin)/publishers/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/src/app/(admin)/labels/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/src/app/(admin)/writers/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE5 => "[project]/src/app/(admin)/artists/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(admin)/songs/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$spotify$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(admin)/songs/spotify-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$publishers$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(admin)/publishers/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$labels$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(admin)/labels/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$writers$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(admin)/writers/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$artists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(admin)/artists/actions.ts [app-rsc] (ecmascript)");
}),
"[project]/.next-internal/server/app/(admin)/songs/new/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/(admin)/songs/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/(admin)/songs/spotify-actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/app/(admin)/publishers/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/src/app/(admin)/labels/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/src/app/(admin)/writers/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/src/app/(admin)/artists/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(admin)/songs/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$songs$2f$spotify$2d$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(admin)/songs/spotify-actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$publishers$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(admin)/publishers/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$labels$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(admin)/labels/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$writers$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(admin)/writers/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$artists$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(admin)/artists/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
}),
"[project]/src/app/(admin)/artists/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"402c12142a5a760598ec7aab5e11fb0910053e6317":{"name":"createArtistInline"},"406084a770008dbbb92743b7fc2d636293efa68f31":{"name":"createArtist"},"40d4b8ecc36e12019cc355a0843464daa1f56238e9":{"name":"deleteArtists"},"6077414cd07c1a7aa2e910616c067211c1f3130dcd":{"name":"updateArtist"}},"src/app/(admin)/artists/actions.ts",""] */ __turbopack_context__.s([
    "createArtist",
    ()=>createArtist,
    "createArtistInline",
    ()=>createArtistInline,
    "deleteArtists",
    ()=>deleteArtists,
    "updateArtist",
    ()=>updateArtist
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
const BASE_PATH = "/artists";
async function createArtist(formData) {
    const name = (formData.get("name") ?? "").toString().trim();
    if (!name) throw new Error("Name is required.");
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error } = await supabase.from("artists").insert({
        name
    });
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(BASE_PATH);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(BASE_PATH);
}
async function createArtistInline(name) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { data, error } = await supabase.from("artists").insert({
        name
    }).select("id, name").single();
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(BASE_PATH);
    return data;
}
async function updateArtist(id, formData) {
    const name = (formData.get("name") ?? "").toString().trim();
    if (!name) throw new Error("Name is required.");
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error } = await supabase.from("artists").update({
        name
    }).eq("id", id);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(BASE_PATH);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`${BASE_PATH}/${id}`);
}
async function deleteArtists(ids) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error } = await supabase.from("artists").delete().in("id", ids);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(BASE_PATH);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createArtist,
    createArtistInline,
    updateArtist,
    deleteArtists
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createArtist, "406084a770008dbbb92743b7fc2d636293efa68f31", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createArtistInline, "402c12142a5a760598ec7aab5e11fb0910053e6317", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateArtist, "6077414cd07c1a7aa2e910616c067211c1f3130dcd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteArtists, "40d4b8ecc36e12019cc355a0843464daa1f56238e9", null);
}),
"[project]/src/app/(admin)/labels/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40641c1da16ac277d255b7978c6135ef881cea237e":{"name":"createLabelInline"},"407cb5922bf25c3adea3611e815783701279948f44":{"name":"createLabel"},"40dacaf3c4a663fb34f192d42fc4d39ad7f1de4987":{"name":"deleteLabels"},"60fb92f469776b9a7c818d86e81d574a5fb8f3ad1c":{"name":"updateLabel"}},"src/app/(admin)/labels/actions.ts",""] */ __turbopack_context__.s([
    "createLabel",
    ()=>createLabel,
    "createLabelInline",
    ()=>createLabelInline,
    "deleteLabels",
    ()=>deleteLabels,
    "updateLabel",
    ()=>updateLabel
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
const BASE_PATH = "/labels";
async function createLabel(formData) {
    const name = (formData.get("name") ?? "").toString().trim();
    if (!name) throw new Error("Name is required.");
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error } = await supabase.from("labels").insert({
        name
    });
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(BASE_PATH);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(BASE_PATH);
}
async function createLabelInline(name) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { data, error } = await supabase.from("labels").insert({
        name
    }).select("id, name").single();
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(BASE_PATH);
    return data;
}
async function updateLabel(id, formData) {
    const name = (formData.get("name") ?? "").toString().trim();
    if (!name) throw new Error("Name is required.");
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error } = await supabase.from("labels").update({
        name
    }).eq("id", id);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(BASE_PATH);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`${BASE_PATH}/${id}`);
}
async function deleteLabels(ids) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error } = await supabase.from("labels").delete().in("id", ids);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(BASE_PATH);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createLabel,
    createLabelInline,
    updateLabel,
    deleteLabels
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createLabel, "407cb5922bf25c3adea3611e815783701279948f44", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createLabelInline, "40641c1da16ac277d255b7978c6135ef881cea237e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateLabel, "60fb92f469776b9a7c818d86e81d574a5fb8f3ad1c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteLabels, "40dacaf3c4a663fb34f192d42fc4d39ad7f1de4987", null);
}),
"[project]/src/app/(admin)/publishers/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40180de1d23806e7f286e3d13e899527db913b1403":{"name":"createPublisher"},"40890e0ad3725886027c610abb8b8217afab0b1b3b":{"name":"deletePublishers"},"409f1f1e1b7da6a6288c78d630c47a416611f98dcf":{"name":"createPublisherInline"},"608b0d70965cc782130bc7a6f19b1eeb324675a18b":{"name":"updatePublisher"}},"src/app/(admin)/publishers/actions.ts",""] */ __turbopack_context__.s([
    "createPublisher",
    ()=>createPublisher,
    "createPublisherInline",
    ()=>createPublisherInline,
    "deletePublishers",
    ()=>deletePublishers,
    "updatePublisher",
    ()=>updatePublisher
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
const BASE_PATH = "/publishers";
async function createPublisher(formData) {
    const name = (formData.get("name") ?? "").toString().trim();
    if (!name) throw new Error("Name is required.");
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error } = await supabase.from("publishers").insert({
        name
    });
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(BASE_PATH);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(BASE_PATH);
}
async function createPublisherInline(name) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { data, error } = await supabase.from("publishers").insert({
        name
    }).select("id, name").single();
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(BASE_PATH);
    return data;
}
async function updatePublisher(id, formData) {
    const name = (formData.get("name") ?? "").toString().trim();
    if (!name) throw new Error("Name is required.");
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error } = await supabase.from("publishers").update({
        name
    }).eq("id", id);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(BASE_PATH);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`${BASE_PATH}/${id}`);
}
async function deletePublishers(ids) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error } = await supabase.from("publishers").delete().in("id", ids);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(BASE_PATH);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createPublisher,
    createPublisherInline,
    updatePublisher,
    deletePublishers
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPublisher, "40180de1d23806e7f286e3d13e899527db913b1403", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPublisherInline, "409f1f1e1b7da6a6288c78d630c47a416611f98dcf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePublisher, "608b0d70965cc782130bc7a6f19b1eeb324675a18b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deletePublishers, "40890e0ad3725886027c610abb8b8217afab0b1b3b", null);
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
"[project]/src/app/(admin)/songs/spotify-actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"604c0ad1147329a85acf33e42636cfe052cc62aeab":{"name":"fetchSpotifyCoverArt"},"60e9a895cfd0197da00de06a690d772539ab060466":{"name":"fetchSpotifyPublisher"}},"src/app/(admin)/songs/spotify-actions.ts",""] */ __turbopack_context__.s([
    "fetchSpotifyCoverArt",
    ()=>fetchSpotifyCoverArt,
    "fetchSpotifyPublisher",
    ()=>fetchSpotifyPublisher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/admin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$spotify$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/spotify/client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function fetchSpotifyCoverArt(title, artistNames) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
        return {
            ok: false,
            error: "Enter a title before fetching from Spotify."
        };
    }
    try {
        const match = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$spotify$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchTrack"])(trimmedTitle, artistNames);
        if (!match) {
            return {
                ok: false,
                error: "No matching track found on Spotify."
            };
        }
        return {
            ok: true,
            coverArtUrl: match.coverArtUrl,
            spotifyTrackId: match.trackId
        };
    } catch (err) {
        return {
            ok: false,
            error: err instanceof Error ? err.message : "Spotify search failed."
        };
    }
}
async function fetchSpotifyPublisher(title, artistNames) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
        return {
            ok: false,
            error: "Enter a title before fetching from Spotify."
        };
    }
    let match;
    try {
        match = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$spotify$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchTrack"])(trimmedTitle, artistNames);
    } catch (err) {
        return {
            ok: false,
            error: err instanceof Error ? err.message : "Spotify search failed."
        };
    }
    if (!match) {
        return {
            ok: false,
            error: "No matching track found on Spotify."
        };
    }
    let copyrightText = null;
    try {
        copyrightText = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$spotify$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAlbumCopyrightText"])(match.albumId);
    } catch (err) {
        return {
            ok: false,
            error: err instanceof Error ? err.message : "Spotify album lookup failed."
        };
    }
    if (!copyrightText) {
        return {
            ok: false,
            error: "Spotify has no copyright/publishing credit for this album."
        };
    }
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { data: existing } = await supabase.from("publishers").select("id, name").ilike("name", copyrightText).maybeSingle();
    if (existing) {
        return {
            ok: true,
            publisher: existing,
            created: false
        };
    }
    const { data: created, error } = await supabase.from("publishers").insert({
        name: copyrightText
    }).select("id, name").single();
    if (error || !created) {
        return {
            ok: false,
            error: error?.message ?? "Could not create the publisher record."
        };
    }
    return {
        ok: true,
        publisher: created,
        created: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    fetchSpotifyCoverArt,
    fetchSpotifyPublisher
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchSpotifyCoverArt, "604c0ad1147329a85acf33e42636cfe052cc62aeab", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchSpotifyPublisher, "60e9a895cfd0197da00de06a690d772539ab060466", null);
}),
"[project]/src/app/(admin)/writers/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40acfe71a6f518235dcee1e064697f933e40112ef2":{"name":"deleteWriters"},"40d19583f35f35839d263965c09cff1fd4f4fa1159":{"name":"createWriterInline"},"40d1f1b6775e09c00588664a047bf3c7046f5aeb76":{"name":"createWriter"},"6071d4d2a6bfefe1871001862262bbda5f5ce39b69":{"name":"updateWriter"}},"src/app/(admin)/writers/actions.ts",""] */ __turbopack_context__.s([
    "createWriter",
    ()=>createWriter,
    "createWriterInline",
    ()=>createWriterInline,
    "deleteWriters",
    ()=>deleteWriters,
    "updateWriter",
    ()=>updateWriter
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
const BASE_PATH = "/writers";
function parseIdArray(raw) {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw.toString());
        return Array.isArray(parsed) ? parsed.filter((v)=>typeof v === "string") : [];
    } catch  {
        return [];
    }
}
async function syncProLinks(writerId, table, proIds) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error: deleteError } = await supabase.from(table).delete().eq("writer_id", writerId);
    if (deleteError) throw new Error(deleteError.message);
    if (proIds.length > 0) {
        const { error: insertError } = await supabase.from(table).insert(proIds.map((proId)=>({
                writer_id: writerId,
                pro_id: proId
            })));
        if (insertError) throw new Error(insertError.message);
    }
}
async function createWriter(formData) {
    const name = (formData.get("name") ?? "").toString().trim();
    if (!name) throw new Error("Name is required.");
    const publisherId = (formData.get("publisher_id") ?? "").toString() || null;
    const proIds = parseIdArray(formData.get("pro_ids"));
    const publisherProIds = parseIdArray(formData.get("publisher_pro_ids"));
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { data, error } = await supabase.from("writers").insert({
        name,
        publisher_id: publisherId
    }).select("id").single();
    if (error) throw new Error(error.message);
    await syncProLinks(data.id, "writer_pros", proIds);
    await syncProLinks(data.id, "writer_publisher_pros", publisherProIds);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(BASE_PATH);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`${BASE_PATH}/${data.id}`);
}
async function createWriterInline(name) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { data, error } = await supabase.from("writers").insert({
        name
    }).select("id, name").single();
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(BASE_PATH);
    return data;
}
async function updateWriter(id, formData) {
    const name = (formData.get("name") ?? "").toString().trim();
    if (!name) throw new Error("Name is required.");
    const publisherId = (formData.get("publisher_id") ?? "").toString() || null;
    const proIds = parseIdArray(formData.get("pro_ids"));
    const publisherProIds = parseIdArray(formData.get("publisher_pro_ids"));
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error } = await supabase.from("writers").update({
        name,
        publisher_id: publisherId
    }).eq("id", id);
    if (error) throw new Error(error.message);
    await syncProLinks(id, "writer_pros", proIds);
    await syncProLinks(id, "writer_publisher_pros", publisherProIds);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(BASE_PATH);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`${BASE_PATH}/${id}`);
}
async function deleteWriters(ids) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error } = await supabase.from("writers").delete().in("id", ids);
    if (error) throw new Error(error.message);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(BASE_PATH);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createWriter,
    createWriterInline,
    updateWriter,
    deleteWriters
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createWriter, "40d1f1b6775e09c00588664a047bf3c7046f5aeb76", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createWriterInline, "40d19583f35f35839d263965c09cff1fd4f4fa1159", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateWriter, "6071d4d2a6bfefe1871001862262bbda5f5ce39b69", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteWriters, "40acfe71a6f518235dcee1e064697f933e40112ef2", null);
}),
"[project]/src/lib/spotify/client.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAlbumCopyrightText",
    ()=>getAlbumCopyrightText,
    "searchTrack",
    ()=>searchTrack
]);
;
// PLATFORM NOTE (Sep 2026): Spotify deprecated the `preview_url` field on
// tracks in Nov 2024 — it's null for every app now, including this one.
// There is no official replacement for a custom 30-second-clip player, so
// this module deliberately does not attempt to fetch one. The "Audio
// preview" UI instead embeds Spotify's own official player iframe
// (https://open.spotify.com/embed/track/{id}), which still plays previews
// through Spotify's UI. See ClearTrack-ARCHITECTURE.md for the decision.
let cachedToken = null;
async function getAccessToken() {
    if (cachedToken && cachedToken.expiresAt > Date.now() + 10_000) {
        return cachedToken.value;
    }
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        throw new Error("Spotify credentials are not configured (SPOTIFY_CLIENT_ID/SECRET).");
    }
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials"
    });
    if (!response.ok) {
        throw new Error(`Spotify auth failed: ${response.status} ${await response.text()}`);
    }
    const data = await response.json();
    cachedToken = {
        value: data.access_token,
        expiresAt: Date.now() + data.expires_in * 1000
    };
    return cachedToken.value;
}
async function searchTrack(title, artistNames) {
    const token = await getAccessToken();
    const query = artistNames.length ? `track:${title} artist:${artistNames.join(" ")}` : `track:${title}`;
    const url = new URL("https://api.spotify.com/v1/search");
    url.searchParams.set("q", query);
    url.searchParams.set("type", "track");
    url.searchParams.set("limit", "10");
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error(`Spotify search failed: ${response.status} ${await response.text()}`);
    }
    const data = await response.json();
    const items = data.tracks?.items ?? [];
    if (items.length === 0) return null;
    const exact = items.find((t)=>t.name.toLowerCase() === title.trim().toLowerCase());
    const best = exact ?? items[0];
    return {
        trackId: best.id,
        albumId: best.album.id,
        coverArtUrl: best.album.images[0]?.url ?? null
    };
}
async function getAlbumCopyrightText(albumId) {
    const token = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error(`Spotify album lookup failed: ${response.status} ${await response.text()}`);
    }
    const data = await response.json();
    if (!data.copyrights || data.copyrights.length === 0) return null;
    const preferred = data.copyrights.find((c)=>c.type === "C") ?? data.copyrights[0];
    return preferred.text.replace(/^[\u00A9\u2117]\s*/, "") // leading © or ℗
    .replace(/^\d{4}\s*/, "") // leading year
    .trim();
}
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

//# sourceMappingURL=_1zw7fmf._.js.map