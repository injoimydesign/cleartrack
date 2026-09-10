module.exports = [
"[project]/.next-internal/server/app/(admin)/writers/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/(admin)/writers/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40acfe71a6f518235dcee1e064697f933e40112ef2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$writers$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteWriters"],
    "40d19583f35f35839d263965c09cff1fd4f4fa1159",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$writers$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createWriterInline"],
    "40d1f1b6775e09c00588664a047bf3c7046f5aeb76",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$writers$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createWriter"],
    "6071d4d2a6bfefe1871001862262bbda5f5ce39b69",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$writers$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateWriter"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$admin$292f$writers$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$admin$292f$writers$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(admin)/writers/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/(admin)/writers/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$writers$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(admin)/writers/actions.ts [app-rsc] (ecmascript)");
}),
"[project]/.next-internal/server/app/(admin)/writers/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/(admin)/writers/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$admin$292f$writers$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(admin)/writers/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
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

//# sourceMappingURL=_1-kw4xs._.js.map