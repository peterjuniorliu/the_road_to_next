export type Place = "唐朝厅A" | "唐朝厅B" | "唐朝厅C";
export type TimeKey = `${string} - ${string}`; // "09:00-09:45" 这种
type SpeakerProfile = {
    summit: string;
    speaker: string;
    identities: string;
};

type SpeakerInfoProtection = {
    name: string;
    identities: string;
}

type SlotSpeakers = Record<Place, SpeakerProfile>;

export const SCHEDULE: Record<TimeKey, Partial<SlotSpeakers>> = {
    "09:00 - 09:45": {
        "唐朝厅A": { summit: "我是怎么规划自己职业的？", speaker: "乔新亮", identities: 
            "彩食鲜终生荣誉 CTO"
        },
        "唐朝厅B": { summit: "线性注意力技术演进与各算法对比", speaker: "唐飞虎", identities: 
            "月之暗面高级研发工程师"
        },
        "唐朝厅C": { summit: "基于会话的上下文管理和检索", speaker: "马达", identities: 
            "NVIDIA Principal SW. Eng.",
        },
    },

    "10:00 - 10:45": {
        "唐朝厅A": { summit: "AI 时代内容创作竞争力的核心", speaker: "卡兹克", identities: 
            "虚实传媒 CEO"
        },
        "唐朝厅B": { summit: "从 0 到 1 大模型后训练实操分享", speaker: "郑耀威", identities: 
            "北京航空航天大学博士"
        },
        "唐朝厅C": { summit: "从个人上下文到主动式 AI ：面向上下文工程的产品化思考", speaker: "黄柏特", identities: 
            "字节跳动 AI 产品经理"
        },
    },

    "11:00 - 11:45": {
        "唐朝厅A": { summit: "AI 时代个体如何保值增值？", speaker: "李瀚霖", identities: 
            "AI 创业公司运营负责人"
        },
        "唐朝厅B": { summit: "高效大模型技术创新与应用观察", speaker: "井晨哲", identities: 
            "面壁智能首席科学家助理、开源负责人"
        },
        "唐朝厅C": { summit: "语境驱动的记忆：四层架构与情感陪伴的落地思路", speaker: "安开森", identities: 
            "MemU 首席后端架构师"
        },
    },

    "13:30 - 14:15": {
        "唐朝厅A": { summit: "AI 重塑产研：从项目提效，团队提效到研发组织进化的实战之路", speaker: "侯容", identities: 
            "知乎社区生态 B 端产研负责人"
        },
        "唐朝厅B": { summit: "投资人眼中的 2025，AI 产业趋势与创新版图", speaker: "陈石", identities: 
            "峰瑞资本投资合伙人"
        },
        "唐朝厅C": { summit: "解构 AX（Agent Experience）：从 UX 到 AX 创新交互流程探索", speaker: "黄东敏", identities: 
            "零一万物 B&G 端设计专家"
        },
    },

    "14:30 - 15:15": {
        "唐朝厅A": { summit: "L3 AI 协同开发探索之路：困境、路径与实践", speaker: "华剑侃", identities: 
            "快手 CodeFlicker 产品负责人"
        },
        "唐朝厅B": { summit: "从身边的业务开始嵌入 AI", speaker: "尹伟铭", identities: 
            "AI Agent 开发工程师"
        },
        "唐朝厅C": { summit: "从标准化到个性化，AI 可否释放长尾用户需求？", speaker: "刘佳奇", identities: 
            "滴滴出行 AI 应用负责人"
        },
    },

    "15:30 - 16:15": {
        "唐朝厅A": { summit: "从大厂程序员到 AI 陪伴赛道创业者的心路复盘", speaker: "蒋宏伟", identities: 
            "愈愈心理创始人"
        },
        "唐朝厅B": { summit: "从独立开发到独立创造，关于独立开发者的探索与思考", speaker: "李炳峰", identities: 
            "AI 独立开发者"
        },
        "唐朝厅C": { summit: "从推理到创造：新一代国产模型如何成为开发者的生产力引擎？", speaker: "李子玄", identities: 
            "智谱 AI Z.ai 负责人"
        },
    },

    "16:30 - 17:15": {
        "唐朝厅A": { summit: "Quest：基于 Spec 驱动的 AI Coding 新范式", speaker: "徐亮亮", identities: 
            "阿里巴巴 Qoder 技术专家"
        },
        "唐朝厅B": { summit: "AIGC 影视制作的进阶之路", speaker: "陆海倩", identities: 
            "异类 Outliers AIGC 创作者 / 监制"
        },
        "唐朝厅C": { summit: "开放世界中的多智能体协作：从封闭任务到生态智能", speaker: "廖思聪", identities: 
            "OpenAgents AI 工程师"
        },
    },

    "17:30 - 18:15": {
        "唐朝厅A": { summit: "从 AI 助力到 Agent 协同：微博 Wegent 的 Vibe Coding 实践", speaker: "刘亚飞", identities: 
            "微博平台架构技术专家"
        },
        "唐朝厅B": { summit: "AI 如何赋能影视与广告制作？", speaker: "丁一", identities: 
            "广告片 / 纪录片导演"
        },
        "唐朝厅C": { summit: "Agent，我们在做什么？", speaker: "贾伟", identities: 
            "前智谱 AI 战略生态总监"
        },
    },
};

export class SummitTickets
{
    public summitName: string;
    private speakerName = "";
    private speakerIdentities = "";
    public success: boolean = true;
    public errorMessage: string = "";

    constructor
    (
        public startTime: string,            
        public endTime: string,                  
        public place: string
    ) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.place = place;
    }

    private matchSpeakerInfo(): void
    {
        const timeKey = `${this.startTime} - ${this.endTime}` as TimeKey;
        const slot = SCHEDULE[timeKey];

        // 时间不存在
        if (!slot) {
            this.speakerName = "未找到任何发言人的相关信息。";
            this.speakerIdentities = "";
        
            return;
        }

        // 地点不存在或不是 A/B/C
        if (this.place !== "唐朝厅A" && this.place !== "唐朝厅B" && this.place !== "唐朝厅C") {
            this.speakerName = "未找到任何发言人的相关信息。";
            this.speakerIdentities = "";
        
            return;
        }

        const profile = slot[this.place as Place];
        if (!profile) {
            this.speakerName = "未找到任何发言人的相关信息。";
            this.speakerIdentities = "";
        
            return;
        }

        this.summitName = profile.summit;
        this.speakerName = profile.speaker;
        this.speakerIdentities = profile.identities;
    }

    private summitCheck(): boolean 
    {
        const timeKey = `${this.startTime} - ${this.endTime}` as TimeKey;
        const slot = SCHEDULE[timeKey];
        const profile = slot[this.place as Place];

        if (this.summitName !== profile.summit) {
            return false;
        }

        if (!slot) {
            return false;
        }

        if (this.place !== "唐朝厅A" && this.place !== "唐朝厅B" && this.place !== "唐朝厅C") {
            return false;
        }

        return Boolean(slot[this.place as Place]);
    }

    public learningSpeakers(): SpeakerInfoProtection
    {
        return {name: this.speakerName, 
          identities: this.speakerIdentities};
    }

    public resultsReview(): SummitTickets 
    {
        this.speakerName = "";
        this.speakerIdentities = "";

        if (!this.summitCheck()) {
            this.success = false;
            this.errorMessage = "场次信息无效：请检查开始时间/结束时间/地点是否正确。";

            return this;
        }

        this.matchSpeakerInfo();

        if (!this.speakerName || this.speakerName.includes("未找到")) {
            this.success = false;
            this.errorMessage = "已找到场次，但未找到对应的发言人信息（请补全日程表数据）。";
        }

        return this;
    }
}