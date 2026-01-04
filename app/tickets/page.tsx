"use client";
import {useEffect, useMemo, useState} from "react";
import Link from "next/link";
import {SCHEDULE, type Place} from "../data";

type SummitMeta = {
    memberName: string;
    startTime: string;
    endTime: string;
    place: string;
};

type TicketSummary = {
    id: string;
    timeKey: string;
    place: Place;
    summit: string;
    speaker: string;
    identities: string;
};

const PLACES: Place[] = ["唐朝厅A", "唐朝厅B", "唐朝厅C"];

function extractTime(value?: string): string | null {
    if (!value) return null;
    const timePart = value.includes("T") ? value.split("T")[1] : value;
    return timePart?.slice(0, 5) ?? null;
}

export default function TicketsPage() 
{
    const [meta, setMeta] = useState<SummitMeta | null>(null);
    const [metaError, setMetaError] = useState<string | null>(null);

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

    const recommendedTicketId = useMemo(() => {
        if (!meta) return null;
        const start = extractTime(meta.startTime);
        const end = extractTime(meta.endTime);
        if (!start || !end) return null;

        const timeKey = `${start} - ${end}`;
        if (!SCHEDULE[timeKey]) return null;
        const place = meta.place as Place;
        if (!PLACES.includes(place)) return null;
        if (!SCHEDULE[timeKey][place]) return null;

        return encodeURIComponent(`${timeKey}__${place}`);
    }, [meta]);

    const tickets = useMemo(() => {
        const items: TicketSummary[] = [];

        for (const [timeKey, slots] of Object.entries(SCHEDULE)) {
            for (const place of PLACES) {
                const profile = slots[place];
                if (!profile) continue;

                const id = encodeURIComponent(`${timeKey}__${place}`);
                items.push({
                    id,
                    timeKey,
                    place,
                    summit: profile.summit,
                    speaker: profile.speaker,
                    identities: profile.identities
                });
            }
        }

        return items;
    }, []);

    return (
        <div className="min-h-screen friendship-bg text-slate-900">
            <div className="mx-auto max-w-5xl px-6 pt-28 pb-16">
                <div className="mb-10 fade-up">
                    <div className="friendship-chip inline-flex items-center">
                        Step 2 / 3 · Choose Tickets
                    </div>

                    <h1 className="mt-5 text-4xl font-semibold tracking-tight font-display">
                        请选择你心仪的
                        <span className="px-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-500 to-orange-500">
                            场次门票
                        </span>
                    </h1>

                    <p className="mt-3 text-base text-slate-600">
                        根据日程表选择你想参加的 Summit Talk，然后查看票面详情。
                    </p>
                </div>

                <div className="mb-8 friendship-card p-6 fade-up delay-1">
                    <div className="text-sm font-semibold text-slate-800">你的参会信息</div>
                    {meta ? (
                        <div className="mt-3 grid grid-cols-1 gap-4 text-sm text-slate-600 sm:grid-cols-2">
                            <div>
                                <div className="text-xs uppercase text-slate-400">Member</div>
                                <div className="mt-1 font-medium text-slate-800">{meta.memberName}</div>
                            </div>
                            <div>
                                <div className="text-xs uppercase text-slate-400">Place</div>
                                <div className="mt-1 font-medium text-slate-800">{meta.place}</div>
                            </div>
                            <div>
                                <div className="text-xs uppercase text-slate-400">Start</div>
                                <div className="mt-1 font-medium text-slate-800">{meta.startTime}</div>
                            </div>
                            <div>
                                <div className="text-xs uppercase text-slate-400">End</div>
                                <div className="mt-1 font-medium text-slate-800">{meta.endTime}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-3 text-sm text-slate-500">加载中...</div>
                    )}

                    {metaError && (
                        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                            {metaError} <Link href="/" className="font-semibold underline">返回首页</Link>
                        </div>
                    )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    {tickets.map(ticket => (
                        <div
                            key={ticket.id}
                            className={[
                                "friendship-card p-5 transition",
                                ticket.id === recommendedTicketId
                                    ? "border-amber-300 ring-2 ring-amber-200"
                                    : ""
                            ].join(" ")}
                        >
                            <div className="flex items-center justify-between text-xs text-slate-500">
                                <span>{ticket.timeKey}</span>
                                <div className="flex items-center gap-2">
                                    {ticket.id === recommendedTicketId && (
                                        <span className="friendship-chip bg-amber-100 text-amber-700">
                                            推荐
                                        </span>
                                    )}
                                    <span className="friendship-chip">{ticket.place}</span>
                                </div>
                            </div>
                            <h2 className="mt-3 text-lg font-semibold text-slate-900 font-display">
                                {ticket.summit}
                            </h2>
                            <div className="mt-2 text-sm text-slate-600">
                                {ticket.speaker} · {ticket.identities}
                            </div>
                            <div className="mt-4">
                                <Link
                                    href={`/tickets/${ticket.id}`}
                                    className="inline-flex items-center rounded-full friendship-cta px-4 py-2 text-sm font-semibold transition"
                                >
                                    查看票面 →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-xs text-slate-600 fade-up delay-2">
                    Step 3 将展示单张票面详情与参会信息校验结果。
                </div>
            </div>
        </div>
    );
}