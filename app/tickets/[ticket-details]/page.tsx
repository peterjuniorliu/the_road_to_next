"use client";
import {useEffect, useMemo, useState} from "react";
import Link from "next/link";
import {useParams} from "next/navigation";
import {SCHEDULE, type Place, type TimeKey} from "../../data";

type SummitMeta = {
    memberName: string;
    startTime: string;
    endTime: string;
    place: string;
};

type TicketDetail = {
    timeKey: TimeKey;
    place: Place;
    summit: string;
    speaker: string;
    identities: string;
};

type MatchState = {
    status: "match" | "mismatch" | "unknown";
    message: string;
};

const SAVED_TICKETS_KEY = "summit:savedTickets";

function extractTime(value?: string): string | null {
    if (!value) return null;
    const timePart = value.includes("T") ? value.split("T")[1] : value;
    return timePart?.slice(0, 5) ?? null;
}

function parseTimeKey(timeKey: string): {start: string; end: string} | null {
    const parts = timeKey.split(" - ");
    if (parts.length !== 2) return null;
    return {start: parts[0], end: parts[1]};
}

function hashString(input: string): string {
    let hash = 0;
    for (let index = 0; index < input.length; index += 1) {
        hash = (hash * 31 + input.charCodeAt(index)) | 0;
    }
    return Math.abs(hash).toString(36).toUpperCase();
}

function toIcsDate(date: Date): string {
    return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export default function TicketDetailPage() 
{
    const params = useParams();
    const ticketParam = params["ticket-details"];
    const [meta, setMeta] = useState<SummitMeta | null>(null);
    const [metaError, setMetaError] = useState<string | null>(null);
    const [isSaved, setIsSaved] = useState(false);
    const [copyHint, setCopyHint] = useState<string | null>(null);

    useEffect(() => {
        const raw = localStorage.getItem("summit:meta");
        if (!raw) {
            setMetaError("未检测到参会信息，请先在首页填写表单。");
            return;
        }

        try {
            const parsed = JSON.parse(raw) as SummitMeta;
            setMeta(parsed);
        } catch {
            setMetaError("参会信息解析失败，请返回首页重新填写。");
        }
    }, []);

    const detail = useMemo(() => {
        const raw = Array.isArray(ticketParam) ? ticketParam[0] : ticketParam;
        if (!raw) return null;

        const decoded = decodeURIComponent(raw);
        const [timeKey, place] = decoded.split("__");
        if (!timeKey || !place) return null;

        const slot = SCHEDULE[timeKey as TimeKey];
        const profile = slot?.[place as Place];
        if (!profile) return null;

        return {
            timeKey: timeKey as TimeKey,
            place: place as Place,
            summit: profile.summit,
            speaker: profile.speaker,
            identities: profile.identities
        } satisfies TicketDetail;
    }, [ticketParam]);

    const currentTicketId = useMemo(() => {
        const raw = Array.isArray(ticketParam) ? ticketParam[0] : ticketParam;
        return raw ? encodeURIComponent(decodeURIComponent(raw)) : null;
    }, [ticketParam]);

    const recommendedTicketId = useMemo(() => {
        if (!meta) return null;
        const start = extractTime(meta.startTime);
        const end = extractTime(meta.endTime);
        if (!start || !end) return null;

        const timeKey = `${start} - ${end}`;
        if (!SCHEDULE[timeKey]) return null;

        const place = meta.place as Place;
        if (!SCHEDULE[timeKey][place]) return null;

        return encodeURIComponent(`${timeKey}__${place}`);
    }, [meta]);

    const matchState = useMemo<MatchState>(() => {
        if (!detail) {
            return {status: "unknown", message: "未找到票面信息，无法校验。"};
        }

        if (!meta) {
            return {status: "unknown", message: "未检测到参会信息，无法校验。"};
        }

        const start = extractTime(meta.startTime);
        const end = extractTime(meta.endTime);
        if (!start || !end) {
            return {status: "unknown", message: "参会时间格式不完整，无法校验。"};
        }

        const metaTimeKey = `${start} - ${end}` as TimeKey;
        const timeMatch = metaTimeKey === detail.timeKey;
        const placeMatch = meta.place === detail.place;

        if (timeMatch && placeMatch) {
            return {status: "match", message: "当前票面与参会信息完全匹配。"};
        }

        return {status: "mismatch", message: "当前票面与参会信息不一致，请确认场次与会场。"};
    }, [detail, meta]);

    const ticketCode = useMemo(() => {
        if (!detail) return "";
        const base = `${detail.timeKey}-${detail.place}-${meta?.memberName ?? "guest"}`;
        const hashed = hashString(base).slice(0, 6).padStart(6, "0");
        return `AMS-${hashed}`;
    }, [detail, meta]);

    const timeRange = useMemo(() => {
        if (!detail) return null;
        return parseTimeKey(detail.timeKey);
    }, [detail]);

    useEffect(() => {
        if (!currentTicketId) return;
        try {
            const raw = localStorage.getItem(SAVED_TICKETS_KEY);
            const saved = raw ? (JSON.parse(raw) as string[]) : [];
            setIsSaved(saved.includes(currentTicketId));
        } catch {
            setIsSaved(false);
        }
    }, [currentTicketId]);

    function handleSave() {
        if (!currentTicketId) return;
        const raw = localStorage.getItem(SAVED_TICKETS_KEY);
        const saved = raw ? (JSON.parse(raw) as string[]) : [];
        if (saved.includes(currentTicketId)) {
            setIsSaved(true);
            return;
        }
        saved.push(currentTicketId);
        localStorage.setItem(SAVED_TICKETS_KEY, JSON.stringify(saved));
        setIsSaved(true);
    }

    async function handleCopyInfo() {
        if (!detail) return;
        const info = [
            `票面：${detail.summit}`,
            `讲者：${detail.speaker}`,
            `时间：${detail.timeKey}`,
            `会场：${detail.place}`,
            `票号：${ticketCode}`
        ].join("\n");

        try {
            await navigator.clipboard.writeText(info);
            setCopyHint("已复制票面信息");
        } catch {
            setCopyHint("复制失败，请手动复制");
        }

        window.setTimeout(() => setCopyHint(null), 2000);
    }

    async function handleCopyLink() {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            setCopyHint("已复制页面链接");
        } catch {
            setCopyHint("复制链接失败，请手动复制");
        }
        window.setTimeout(() => setCopyHint(null), 2000);
    }

    async function handleShare() {
        if (!detail) return;
        const shareData = {
            title: "Ai Maker Summit Ticket",
            text: `${detail.summit} · ${detail.speaker}`,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch {
                setCopyHint("分享取消或失败");
                window.setTimeout(() => setCopyHint(null), 2000);
                return;
            }
        }

        handleCopyLink();
    }

    function handleDownloadCalendar() {
        if (!detail || !meta) return;
        const datePart = meta.startTime.split("T")[0];
        const range = parseTimeKey(detail.timeKey);
        if (!datePart || !range) return;

        const startDate = new Date(`${datePart}T${range.start}:00`);
        const endDate = new Date(`${datePart}T${range.end}:00`);
        const ics = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Ai Maker Summit//SummitTickets//EN",
            "BEGIN:VEVENT",
            `UID:${ticketCode}`,
            `DTSTAMP:${toIcsDate(new Date())}`,
            `DTSTART:${toIcsDate(startDate)}`,
            `DTEND:${toIcsDate(endDate)}`,
            `SUMMARY:${detail.summit}`,
            `DESCRIPTION:${detail.speaker} · ${detail.identities}`,
            `LOCATION:${detail.place}`,
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\n");

        const blob = new Blob([ics], {type: "text/calendar;charset=utf-8"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${ticketCode}.ics`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }

    function handlePrint() {
        window.print();
    }

    return (
        <div className="min-h-screen friendship-bg text-slate-900">
            <div className="mx-auto max-w-3xl px-6 pt-28 pb-16">
                <div className="mb-10 fade-up">
                    <div className="friendship-chip inline-flex items-center">
                        Step 3 / 3 · Ticket Detail
                    </div>

                    <h1 className="mt-5 text-4xl font-semibold tracking-tight font-display">
                        票面
                        <span className="px-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-500 to-orange-500">
                            详情
                        </span>
                    </h1>

                    <p className="mt-3 text-base text-slate-600">
                        查看场次信息与讲者资料，确认你的参会安排。
                    </p>
                </div>

                {!detail && (
                    <div className="friendship-card p-6 fade-up delay-1">
                        <div className="text-sm text-slate-600">
                            没有找到对应的票面信息，请返回门票列表重新选择。
                        </div>
                        <div className="mt-4">
                            <Link href="/tickets" className="inline-flex items-center rounded-full friendship-cta px-4 py-2 text-sm font-semibold transition">
                                返回门票列表 →
                            </Link>
                        </div>
                    </div>
                )}

                {detail && (
                    <div className="ticket-print-area friendship-card p-6 fade-up delay-1">
                        <div className="mb-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-orange-400" />
                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                            <span>{detail.timeKey}</span>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="friendship-chip">{detail.place}</span>
                                <span className="friendship-chip">票号 {ticketCode}</span>
                                {isSaved && (
                                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">
                                        已保存
                                    </span>
                                )}
                            </div>
                        </div>
                        <h2 className="mt-4 text-2xl font-semibold text-slate-900 font-display">
                            {detail.summit}
                        </h2>
                        <div className="mt-2 text-sm text-slate-600">
                            {detail.speaker} · {detail.identities}
                        </div>

                        <div className="mt-6 grid gap-4 rounded-xl border border-amber-100 bg-amber-50/60 p-4 text-sm text-slate-600 sm:grid-cols-2">
                            <div>
                                <div className="text-xs uppercase text-slate-400">Ticket Holder</div>
                                <div className="mt-1 font-medium text-slate-900">
                                    {meta?.memberName ?? "未填写"}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs uppercase text-slate-400">Meeting Place</div>
                                <div className="mt-1 font-medium text-slate-900">
                                    {meta?.place ?? "未填写"}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs uppercase text-slate-400">Start Time</div>
                                <div className="mt-1 font-medium text-slate-900">
                                    {meta?.startTime ?? "未填写"}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs uppercase text-slate-400">End Time</div>
                                <div className="mt-1 font-medium text-slate-900">
                                    {meta?.endTime ?? "未填写"}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs uppercase text-slate-400">Session Time</div>
                                <div className="mt-1 font-medium text-slate-900">
                                    {timeRange ? `${timeRange.start} - ${timeRange.end}` : "未知"}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs uppercase text-slate-400">Speaker</div>
                                <div className="mt-1 font-medium text-slate-900">
                                    {detail.speaker}
                                </div>
                            </div>
                        </div>

                        <div className={[
                            "mt-4 rounded-xl border px-4 py-3 text-sm",
                            matchState.status === "match"
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                : matchState.status === "mismatch"
                                    ? "border-rose-200 bg-rose-50 text-rose-700"
                                    : "border-slate-200 bg-slate-50 text-slate-600"
                        ].join(" ")}>
                            {matchState.message}
                        </div>

                        {metaError && (
                            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                                {metaError} <Link href="/" className="font-semibold underline">返回首页</Link>
                            </div>
                        )}

                        <div className="mt-4 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600">
                            <div className="text-xs uppercase text-slate-400">Check-in Tips</div>
                            <div className="mt-2 grid gap-2 sm:grid-cols-2">
                                <div>请提前 10 分钟抵达对应会场。</div>
                                <div>携带身份证件与票号以便核验。</div>
                                <div>如需更换场次，请先保存新的票面。</div>
                                <div>现场将提供座位引导与指示牌。</div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-3 print-hidden">
                            <Link
                                href="/tickets"
                                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                            >
                                返回门票列表
                            </Link>
                            {matchState.status === "mismatch" &&
                                recommendedTicketId &&
                                recommendedTicketId !== currentTicketId && (
                                <Link
                                    href={`/tickets/${recommendedTicketId}`}
                                    className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:border-amber-300"
                                >
                                    切换到推荐票面
                                </Link>
                            )}
                            <button
                                type="button"
                                onClick={handleSave}
                                className={[
                                    "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition",
                                    isSaved
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "friendship-cta"
                                ].join(" ")}
                            >
                                {isSaved ? "已保存到行程" : "保存到我的行程"}
                            </button>
                            <button
                                type="button"
                                onClick={handleCopyInfo}
                                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                            >
                                复制票面信息
                            </button>
                            <button
                                type="button"
                                onClick={handleCopyLink}
                                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                            >
                                复制页面链接
                            </button>
                            <button
                                type="button"
                                onClick={handleShare}
                                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                            >
                                分享票面
                            </button>
                            <button
                                type="button"
                                onClick={handleDownloadCalendar}
                                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                            >
                                添加到日历
                            </button>
                            <button
                                type="button"
                                onClick={handlePrint}
                                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                            >
                                打印/导出票面
                            </button>
                            {copyHint && (
                                <span className="text-xs text-slate-500">{copyHint}</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}