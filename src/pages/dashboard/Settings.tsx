import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { useUpdateUser, useUser } from "../../hooks/queries";
import {
  usePreferencesStore,
  type Density,
  type ThemeMode,
} from "../../stores/preferences";
import { Avatar, Card } from "./shared";

type SectionKey =
  | "profile"
  | "account"
  | "notification"
  | "appearance"
  | "integrations"
  | "danger";

const sections: {
  key: SectionKey;
  label: string;
  desc: string;
  icon: string;
}[] = [
  { key: "profile", label: "个人资料", desc: "基本信息与简介", icon: "👤" },
  { key: "account", label: "账号安全", desc: "密码与登录设备", icon: "🛡️" },
  { key: "notification", label: "通知设置", desc: "邮件 / 站内提醒", icon: "🔔" },
  { key: "appearance", label: "界面偏好", desc: "主题、语言、密度", icon: "🎨" },
  { key: "integrations", label: "集成", desc: "第三方账号绑定", icon: "🔌" },
  { key: "danger", label: "敏感操作", desc: "导出数据 / 注销", icon: "⚠️" },
];

function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition ${
        checked ? "bg-ocean-700" : "bg-slate-200"
      }`}
      aria-pressed={checked}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
          checked ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="flex items-start justify-between gap-3 rounded-lg px-1 py-1.5">
      <div className="min-w-0">
        <div className="text-sm font-medium text-ocean-900">{label}</div>
        {hint && <div className="mt-0.5 text-[11px] text-slate-400">{hint}</div>}
      </div>
      <div className="shrink-0">{children}</div>
    </label>
  );
}

function ProfileSection() {
  const { data: user } = useUser();
  const updateUser = useUpdateUser();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio ?? "");
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-3 lg:grid lg:h-full lg:grid-cols-12">
      <div className="lg:col-span-5 lg:min-h-0">
        <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-gradient-to-br from-ocean-50 to-white p-5 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
          <Avatar initials={user.avatarInitials} size="xl" className="ring-4 ring-white" />
          <div className="text-center">
            <div className="text-base font-semibold text-ocean-950 dark:text-white">
              {user.name}
            </div>
            <div className="mt-0.5 text-xs text-slate-500">
              {user.role} · {user.department}
            </div>
            <span className="mt-2 inline-block rounded-md bg-ocean-900 px-2 py-0.5 text-[11px] font-bold text-white">
              {user.level}
            </span>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-ocean-300 hover:text-ocean-700">
              更换头像
            </button>
            <button
              type="button"
              onClick={() =>
                updateUser.mutate(
                  { name, email, bio },
                  { onSuccess: () => toast.success("资料已保存") },
                )
              }
              className="rounded-lg bg-ocean-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-ocean-800"
            >
              保存修改
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="姓名">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-44 rounded-md border border-slate-200 bg-white px-2 py-1 text-sm outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/15 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </Field>
          <Field label="工号">
            <input
              defaultValue={user.employeeId}
              disabled
              className="w-44 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-sm text-slate-500 outline-none"
            />
          </Field>
          <Field label="邮箱">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-44 rounded-md border border-slate-200 bg-white px-2 py-1 text-sm outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/15 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </Field>
          <Field label="手机">
            <input
              defaultValue={user.phone}
              className="w-44 rounded-md border border-slate-200 bg-white px-2 py-1 text-sm outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/15"
            />
          </Field>
          <Field label="部门">
            <input
              defaultValue={user.department}
              disabled
              className="w-44 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-sm text-slate-500 outline-none"
            />
          </Field>
          <Field label="入职日期">
            <input
              defaultValue={user.joinedAt}
              disabled
              className="w-44 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-sm text-slate-500 outline-none"
            />
          </Field>
        </div>
        <div className="mt-2 px-1">
          <div className="text-sm font-medium text-ocean-900">个人简介</div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 h-20 w-full resize-none rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/15 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}

function AccountSection() {
  const [tfa, setTfa] = useState(true);
  return (
    <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2 lg:h-full lg:min-h-0">
      <div className="rounded-2xl border border-slate-100 bg-slate-50/40 p-3">
        <div className="text-sm font-medium text-ocean-900">登录密码</div>
        <p className="mt-0.5 text-[11px] text-slate-400">
          建议每 90 天更换一次密码
        </p>
        <div className="mt-2 space-y-1.5">
          <input
            type="password"
            placeholder="当前密码"
            className="w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/15"
          />
          <input
            type="password"
            placeholder="新密码"
            className="w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/15"
          />
          <input
            type="password"
            placeholder="确认新密码"
            className="w-full rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/15"
          />
          <button className="w-full rounded-md bg-ocean-900 py-1.5 text-xs font-medium text-white hover:bg-ocean-800">
            更新密码
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-slate-50/40 p-3">
        <Field label="两步验证" hint="使用 Authenticator App 生成动态码">
          <Switch checked={tfa} onChange={setTfa} />
        </Field>
        <div className="mt-2 text-sm font-medium text-ocean-900">登录设备</div>
        <ul className="mt-1 space-y-1.5">
          {[
            { dev: "MacBook Pro · 上海", when: "本次登录", current: true },
            { dev: "iPhone 15 · 上海", when: "今天 08:14" },
            { dev: "Windows · 北京", when: "5 月 18 日" },
          ].map((d, i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-2 py-1.5"
            >
              <div className="min-w-0">
                <div className="truncate text-sm text-ocean-950">{d.dev}</div>
                <div className="text-[11px] text-slate-400">{d.when}</div>
              </div>
              {d.current ? (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                  当前设备
                </span>
              ) : (
                <button className="text-xs text-rose-600 hover:text-rose-800">
                  退出
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function NotificationSection() {
  const { data: user } = useUser();
  const [s, setS] = useState({
    email: true,
    inapp: true,
    sound: false,
    daily: true,
    mention: true,
    project: true,
    social: false,
  });
  const flip = (k: keyof typeof s) => setS((x) => ({ ...x, [k]: !x[k] }));
  return (
    <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2 lg:h-full lg:min-h-0">
      <div className="rounded-2xl border border-slate-100 bg-slate-50/40 p-3">
        <div className="text-sm font-medium text-ocean-900">通知渠道</div>
        <div className="mt-1 space-y-1">
          <Field label="邮件通知" hint={user?.email ?? "—"}>
            <Switch checked={s.email} onChange={() => flip("email")} />
          </Field>
          <Field label="站内提醒" hint="顶部铃铛红点">
            <Switch checked={s.inapp} onChange={() => flip("inapp")} />
          </Field>
          <Field label="声音提示" hint="新消息时的提示音">
            <Switch checked={s.sound} onChange={() => flip("sound")} />
          </Field>
          <Field label="每日摘要" hint="每天 9:00 工作摘要邮件">
            <Switch checked={s.daily} onChange={() => flip("daily")} />
          </Field>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-100 bg-slate-50/40 p-3">
        <div className="text-sm font-medium text-ocean-900">订阅事件</div>
        <div className="mt-1 space-y-1">
          <Field label="@ 我或回复我" hint="评论、聊天">
            <Switch checked={s.mention} onChange={() => flip("mention")} />
          </Field>
          <Field label="项目状态变更" hint="进度、负责人、截止">
            <Switch checked={s.project} onChange={() => flip("project")} />
          </Field>
          <Field label="社交圈互动" hint="点赞、评论、关注">
            <Switch checked={s.social} onChange={() => flip("social")} />
          </Field>
        </div>
      </div>
    </div>
  );
}

function AppearanceSection() {
  const theme = usePreferencesStore((s) => s.theme);
  const setTheme = usePreferencesStore((s) => s.setTheme);
  const accent = usePreferencesStore((s) => s.accent);
  const setAccent = usePreferencesStore((s) => s.setAccent);
  const density = usePreferencesStore((s) => s.density);
  const setDensity = usePreferencesStore((s) => s.setDensity);
  const [lang, setLang] = useState<"zh-CN" | "en-US">("zh-CN");

  const accents = [
    { key: "ocean", color: "bg-ocean-500" },
    { key: "emerald", color: "bg-emerald-500" },
    { key: "fuchsia", color: "bg-fuchsia-500" },
    { key: "amber", color: "bg-amber-500" },
    { key: "indigo", color: "bg-indigo-500" },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2 lg:h-full lg:min-h-0">
      <div className="rounded-2xl border border-slate-100 bg-slate-50/40 p-3">
        <div className="text-sm font-medium text-ocean-900">主题</div>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {(["light", "dark", "auto"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t as ThemeMode)}
              className={`flex flex-col items-center gap-1 rounded-xl border p-2 transition ${
                theme === t
                  ? "border-ocean-500 ring-2 ring-ocean-500/20"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div
                className={`h-10 w-full rounded-md ${
                  t === "light"
                    ? "bg-gradient-to-br from-white to-slate-100"
                    : t === "dark"
                      ? "bg-gradient-to-br from-slate-800 to-slate-950"
                      : "bg-gradient-to-br from-slate-100 to-slate-800"
                }`}
              />
              <span className="text-xs text-slate-600">
                {t === "light" ? "浅色" : t === "dark" ? "深色" : "跟随系统"}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-3 text-sm font-medium text-ocean-900">主色</div>
        <div className="mt-2 flex gap-2">
          {accents.map((a) => (
            <button
              key={a.key}
              onClick={() => setAccent(a.key)}
              className={`h-7 w-7 rounded-full ${a.color} ring-offset-2 transition ${
                accent === a.key ? "ring-2 ring-slate-700" : "hover:scale-110"
              }`}
              aria-label={a.key}
            />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-slate-50/40 p-3">
        <div className="text-sm font-medium text-ocean-900">显示密度</div>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {(["comfortable", "compact"] as const).map((d) => (
            <button
              key={d}
              onClick={() => {
                setDensity(d as Density);
                toast.success(d === "compact" ? "已切换为紧凑模式" : "已切换为舒适模式");
              }}
              className={`rounded-lg border px-2 py-2 text-left transition ${
                density === d
                  ? "border-ocean-500 ring-2 ring-ocean-500/20"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="text-sm font-medium text-ocean-900">
                {d === "comfortable" ? "舒适" : "紧凑"}
              </div>
              <div className="text-[11px] text-slate-400">
                {d === "comfortable" ? "更大的间距与字号" : "适合大屏看板"}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-3 text-sm font-medium text-ocean-900">语言</div>
        <div className="mt-2 flex gap-2">
          {(["zh-CN", "en-US"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-md border px-3 py-1.5 text-xs transition ${
                lang === l
                  ? "border-ocean-500 bg-ocean-50 text-ocean-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {l === "zh-CN" ? "中文（简体）" : "English"}
            </button>
          ))}
        </div>

        <div className="mt-3 text-sm font-medium text-ocean-900">侧边栏</div>
        <div className="mt-1 space-y-1">
          <Field label="启动时默认展开" hint="否则会以折叠状态打开">
            <Switch checked={true} onChange={() => {}} />
          </Field>
        </div>
      </div>
    </div>
  );
}

function IntegrationsSection() {
  const initial = [
    { name: "Figma", desc: "设计稿同步与评审", connected: true, color: "bg-fuchsia-500", icon: "✏️" },
    { name: "GitHub", desc: "工程文档与代码片段", connected: true, color: "bg-slate-800", icon: "⌥" },
    { name: "Slack", desc: "通知与协作", connected: false, color: "bg-rose-500", icon: "💬" },
    { name: "Google Drive", desc: "导入云端文件", connected: false, color: "bg-amber-500", icon: "🗂️" },
    { name: "Notion", desc: "知识库同步", connected: true, color: "bg-slate-700", icon: "📓" },
    { name: "Jira", desc: "项目任务集成", connected: false, color: "bg-ocean-600", icon: "🧩" },
  ];
  const [list, setList] = useState(initial);
  const toggle = (name: string) => {
    setList((prev) =>
      prev.map((i) => {
        if (i.name !== name) return i;
        const next = !i.connected;
        toast.success(next ? `已连接 ${name}` : `已断开 ${name}`);
        return { ...i, connected: next };
      }),
    );
  };
  return (
    <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3 lg:h-full lg:min-h-0">
      {list.map((i) => (
        <div
          key={i.name}
          className="rounded-2xl border border-slate-100 bg-white p-3"
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg text-white ${i.color}`}
            >
              {i.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-ocean-950">
                {i.name}
              </div>
              <div className="truncate text-[11px] text-slate-400">
                {i.desc}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => toggle(i.name)}
            className={`mt-2.5 w-full rounded-md py-1 text-xs font-medium transition ${
              i.connected
                ? "border border-slate-200 text-slate-600 hover:border-rose-300 hover:text-rose-600"
                : "bg-ocean-900 text-white hover:bg-ocean-800"
            }`}
          >
            {i.connected ? "已连接 · 断开" : "+ 连接"}
          </button>
        </div>
      ))}
    </div>
  );
}

function DangerSection() {
  return (
    <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2 lg:h-full lg:min-h-0">
      <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-3">
        <div className="text-sm font-medium text-amber-800">导出我的数据</div>
        <p className="mt-0.5 text-[11px] text-amber-700">
          将你在 Lucario 上的所有数据（资料、项目、文档、动态）打包导出，可用作离线备份。
        </p>
        <button className="mt-2 rounded-md bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-700">
          导出 (.zip)
        </button>
      </div>
      <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-3">
        <div className="text-sm font-medium text-rose-800">注销账号</div>
        <p className="mt-0.5 text-[11px] text-rose-700">
          注销后无法恢复，关联的资产将自动归还，项目权限将转交给部门负责人。
        </p>
        <button className="mt-2 rounded-md bg-rose-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-700">
          申请注销
        </button>
      </div>
    </div>
  );
}

export default function Settings() {
  const [active, setActive] = useState<SectionKey>("profile");
  const current = sections.find((s) => s.key === active)!;

  return (
    <div className="flex flex-col gap-3 lg:grid lg:h-full lg:min-h-0 lg:grid-cols-12 lg:gap-4">
      <div className="shrink-0 lg:col-span-3 lg:min-h-0">
        <Card title="设置" subtitle="管理你的工作空间" bodyClassName="overflow-x-auto lg:overflow-y-auto lg:pr-1">
          <ul className="flex gap-2 lg:flex-col lg:gap-1">
            {sections.map((s) => {
              const a = s.key === active;
              return (
                <li key={s.key}>
                  <button
                    onClick={() => setActive(s.key)}
                    className={`flex w-full min-w-[140px] shrink-0 items-start gap-2.5 rounded-lg px-2 py-2 text-left transition lg:min-w-0 ${
                      a
                        ? "bg-ocean-50 ring-1 ring-ocean-100"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-lg leading-none">{s.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`text-sm ${
                          a ? "font-medium text-ocean-900" : "text-slate-700"
                        }`}
                      >
                        {s.label}
                      </div>
                      <div className="truncate text-[11px] text-slate-400">
                        {s.desc}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <div className="min-h-[400px] flex-1 lg:col-span-9 lg:min-h-0">
        <Card
          title={current.label}
          subtitle={current.desc}
          action={
            <button className="text-xs text-ocean-700 hover:text-ocean-900">
              帮助文档
            </button>
          }
        >
          {active === "profile" && <ProfileSection />}
          {active === "account" && <AccountSection />}
          {active === "notification" && <NotificationSection />}
          {active === "appearance" && <AppearanceSection />}
          {active === "integrations" && <IntegrationsSection />}
          {active === "danger" && <DangerSection />}
        </Card>
      </div>
    </div>
  );
}
