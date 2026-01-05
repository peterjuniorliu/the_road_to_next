"use client";
import {useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import {SummitTickets} from "./data";

type FormState = {
    memberName: string;
    startTime: string;
    endTime: string;
    place: string;
};

const initialState: FormState = {
    memberName: "",
    startTime: "",
    endTime: "",
    place: ""
};

const HomePage = () => 
{
    const router = useRouter();
    const [form, setForm] = useState<FormState>(initialState);
    const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
        memberName: false,
        startTime: false,
        endTime: false,
        place: false
    });

    const errors = useMemo(() => {
        const error: Partial<Record<keyof FormState, string>> = {};

        if (!form.memberName.trim()) error.memberName = "请输入姓名";
        if (!form.place.trim()) error.place = "请输入地点";
        if (!form.startTime) error.startTime = "请选择开始时间";
        if (!form.endTime) error.endTime = "请选择结束时间";

        // 时间逻辑校验：结束必须晚于开始
        if (form.startTime && form.endTime) {
            const start = new Date(form.startTime).getTime();
            const end = new Date(form.endTime).getTime();

            if (!Number.isNaN(start) && !Number.isNaN(end) && end <= start) {
                error.endTime = "结束时间必须晚于开始时间";
            }
        }

        return error;    
    }, [form]);

    const isValid = Object.keys(errors).length === 0;

    function update<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm(prev => ({ ...prev, [key]: value }));
    }

    function markTouched<K extends keyof FormState>(key: K) {
        setTouched(prev => ({ ...prev, [key]: true }));
    }

    function onSubmit(error: React.FormEvent) {
        error.preventDefault();

        setTouched({
            memberName: true,
            startTime: true,
            endTime: true,
            place: true
        });

        if (!isValid) {
            return;
        }

        // 把配置存起来，再进入下一页
        // 先用 localStorage 简化（后续你可以替换成 zustand / server action / DB）
        localStorage.setItem("summit:meta", JSON.stringify(form));

        router.push("/tickets");
    }

    return (
        <div className="min-h-screen friendship-bg text-slate-900">
            {/* 外层容器：让内容居中，并留出导航栏高度 */}
            <div className="mx-auto max-w-3xl px-6 pt-28 pb-16">
                {/* Step Header */}
                <div className="mb-10 fade-up">
                <div className="friendship-chip inline-flex items-center">
                    Step 1 / 3 · Meeting Setup
                </div>

                <h1 className="mt-5 text-4xl font-semibold tracking-tight font-display">
                    请输入你的
                    <span className="px-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-500 to-orange-500">
                        参会信息
                    </span>
                </h1>

                <p className="mt-3 text-base text-slate-600">
                    这些信息将用于生成会议安排与参会票（SummitTickets）。
                </p>
                </div>

                {/* Card Form */}
                <div className="friendship-card p-7 fade-up delay-1">
                    <form onSubmit={onSubmit} className="space-y-5">
                        {/* Name */}
                        <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-800">
                            姓名 / Member Name
                        </label>
                        <input
                            value={form.memberName}
                            onChange={e => update("memberName", e.target.value)}
                            onBlur={() => markTouched("memberName")}
                            placeholder="例如：Peter Liu"
                            className={[
                            "w-full rounded-lg border px-3 py-2 text-sm outline-none transition",
                            "bg-white/90",
                            touched.memberName && errors.memberName
                                ? "border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                                : "border-amber-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100",
                            ].join(" ")}
                        />
                        {touched.memberName && errors.memberName && (
                            <p className="text-xs text-red-600">{errors.memberName}</p>
                        )}
                        </div>

                        {/* Place */}
                        <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-800">
                            地点 / Place
                        </label>
                        <input
                            value={form.place}
                            onChange={e => update("place", e.target.value)}
                            onBlur={() => markTouched("place")}
                            placeholder="例如：长沙 / Zoom / Room 301"
                            className={[
                            "w-full rounded-lg border px-3 py-2 text-sm outline-none transition",
                            "bg-white/90",
                            touched.place && errors.place
                                ? "border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                                : "border-amber-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100",
                            ].join(" ")}
                        />
                        {touched.place && errors.place && (
                            <p className="text-xs text-red-600">{errors.place}</p>
                        )}
                        </div>

                        {/* Time row */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Start */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-800">
                            开始时间 / Start Time
                            </label>
                            <input
                            type="datetime-local"
                            value={form.startTime}
                            onChange={e => update("startTime", e.target.value)}
                            onBlur={() => markTouched("startTime")}
                            className={[
                                "w-full rounded-lg border px-3 py-2 text-sm outline-none transition",
                                "bg-white/90",
                                touched.startTime && errors.startTime
                                ? "border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                                : "border-amber-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100",
                            ].join(" ")}
                            />
                            {touched.startTime && errors.startTime && (
                            <p className="text-xs text-red-600">{errors.startTime}</p>
                            )}
                        </div>

                        {/* End */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-800">
                            结束时间 / End Time
                            </label>
                            <input
                            type="datetime-local"
                            value={form.endTime}
                            onChange={e => update("endTime", e.target.value)}
                            onBlur={() => markTouched("endTime")}
                            className={[
                                "w-full rounded-lg border px-3 py-2 text-sm outline-none transition",
                                "bg-white/90",
                                touched.endTime && errors.endTime
                                ? "border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                                : "border-amber-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100",
                            ].join(" ")}
                            />
                            {touched.endTime && errors.endTime && (
                            <p className="text-xs text-red-600">{errors.endTime}</p>
                            )}
                        </div>
                    </div>

                    {/* Footer actions */}
                    <div className="pt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs text-slate-500">
                        共 {SummitTickets?.length ?? 0} 张 SummitTickets 已载入（可在下一步使用）
                    </div>

                    <button
                        type="submit"
                        disabled={!isValid}
                        className={[
                        "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition",
                        isValid
                            ? "friendship-cta"
                            : "bg-slate-200 text-slate-500 cursor-not-allowed",
                        ].join(" ")}
                    >
                        Continue →
                    </button>
                    </div>
                </form>
                </div>

                {/* Hint (for future steps) */}
                <div className="mt-8 rounded-2xl border border-white/80 bg-white/70 p-4 text-xs text-slate-600 shadow-sm fade-up delay-2">
                    下一步建议：在 <code className="rounded bg-slate-100 px-1 py-0.5">/tickets</code> 页面读取{" "}
                    <code className="rounded bg-slate-100 px-1 py-0.5">localStorage["summit:meta"]</code>，
                    作为会议上下文（Context）。
                </div>
            </div>
        </div>
    );
}

export default HomePage;