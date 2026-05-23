import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { GuideLayout } from '../components/GuideLayout'
import { TagRuleTable } from '../components/TagRuleTable'

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-6">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-4 text-slate-700 leading-relaxed">{children}</div>
    </section>
  )
}

export function TagsGuide() {
  return (
    <GuideLayout
      title="How tagging works"
      subtitle="Use member and purchase data to segment fans for smarter marketing — then import tags into your CDP."
    >
      <nav className="mb-10 rounded-lg border border-indigo-100 bg-indigo-50/50 p-4 text-sm">
        <p className="font-medium text-indigo-900">On this page</p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-indigo-700">
          <li>
            <a href="#why" className="hover:underline">
              Why segment
            </a>
          </li>
          <li>
            <a href="#data" className="hover:underline">
              Three data sheets
            </a>
          </li>
          <li>
            <a href="#workflow" className="hover:underline">
              Workflow
            </a>
          </li>
          <li>
            <a href="#rules" className="hover:underline">
              Tag types
            </a>
          </li>
          <li>
            <a href="#example" className="hover:underline">
              Volleyball example
            </a>
          </li>
          <li>
            <a href="#segments" className="hover:underline">
              Combine tags
            </a>
          </li>
        </ul>
      </nav>

      <div className="space-y-12">
        <Section id="why" title="Why segmented marketing?">
          <p>
            Stockfeel CDP helps you treat different customers differently. The goal is simple:{' '}
            <strong>show each fan the offers they care about</strong> so they are more likely to buy
            again — tickets, jerseys, memberships, and more.
          </p>
          <p>
            A supporter who only buys match tickets should not get the same message as someone who
            buys a new jersey every season. <strong>Tags</strong> label each member so you can build
            audiences and run targeted campaigns instead of one-size-fits-all blasts.
          </p>
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm">
            <p className="font-medium text-slate-800">Example client: volleyball team</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li>Tickets — single match, season, VIP</li>
              <li>Apparel — jerseys, t-shirts, scarves</li>
              <li>Other — accessories, bundles, fan experiences</li>
            </ul>
            <p className="mt-3 text-slate-600">
              Use purchase history to label fans by frequency, category preference, and spend — then
              market each product line to the right group.
            </p>
          </div>
        </Section>

        <Section id="data" title="Three data sheets (linked by 歸戶碼)">
          <p>
            Every member is identified by <code className="rounded bg-slate-100 px-1">歸戶碼</code>.
            All three CDP files use this ID to connect profiles, orders, and tags.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                title: '會員名單',
                desc: 'Who they are — phone, email, birthday, gender, join date, LINE',
                link: '/import/member_list',
              },
              {
                title: '訂單紀錄',
                desc: 'What they bought — order time, amount, product category, quantity',
                link: '/import/orders',
              },
              {
                title: '標籤',
                desc: 'Labels on each member for segmentation in campaigns',
                link: '/import/tags',
              },
            ].map((card) => (
              <Link
                key={card.title}
                to={card.link}
                className="rounded-lg border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-1 text-xs text-slate-600">{card.desc}</p>
                <span className="mt-2 inline-block text-xs text-indigo-600">Clean CSV →</span>
              </Link>
            ))}
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100">
            <pre>{`歸戶碼,標籤\n123456,"freq_high,pref_ticket,recent_30d"`}</pre>
          </div>
          <p className="text-sm text-slate-600">
            Multiple tags can sit in one <code className="rounded bg-slate-100 px-1">標籤</code>{' '}
            cell, separated by commas. Tags belong to <em>people</em>, not individual order lines.
          </p>
        </Section>

        <Section id="workflow" title="How to create tags (step by step)">
          <p>
            Tags are <strong>business rules</strong> applied to your member list and order history —
            not auto-generated by this website today. You define the rules, produce a tags CSV, then
            import it into the CDP.
          </p>
          <ol className="list-decimal space-y-3 pl-5">
            <li>
              Prepare <strong>會員名單</strong> and <strong>訂單紀錄</strong> (use this site’s CSV
              cleaner if headers don’t match CDP).
            </li>
            <li>
              For each <code className="rounded bg-slate-100 px-1">歸戶碼</code>, analyze orders —
              count, dates, categories, spend (Excel, SQL, or your BI tool).
            </li>
            <li>Apply tag rules (see below) and write tag names per member.</li>
            <li>
              Export a file like <code className="rounded bg-slate-100 px-1">example_tags.csv</code>
              .
            </li>
            <li>Import member list, orders, and tags into the CDP.</li>
            <li>
              In your campaign tool, target audiences: e.g. everyone with{' '}
              <code className="rounded bg-slate-100 px-1">pref_ticket</code> and{' '}
              <code className="rounded bg-slate-100 px-1">freq_high</code>.
            </li>
          </ol>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/import/member_list"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Clean member list CSV
            </Link>
            <Link
              to="/import/orders"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Clean orders CSV
            </Link>
            <Link
              to="/import/tags"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Clean tags CSV
            </Link>
          </div>
        </Section>

        <Section id="rules" title="Tag types and example rules">
          <p className="text-sm text-slate-600">
            Thresholds (e.g. “high frequency”) should be agreed per client. Below are starting
            points for sports and retail.
          </p>

          <TagRuleTable
            caption="From 訂單紀錄 — purchase frequency"
            rows={[
              {
                tag: 'freq_high',
                rule: '≥ 4 paid orders in last 12 months',
                use: 'Loyalty perks, early access',
              },
              {
                tag: 'freq_mid',
                rule: '2–3 orders in last 12 months',
                use: 'Nudge toward next purchase',
              },
              {
                tag: 'freq_low',
                rule: '1 order in last 12 months',
                use: 'Win-back, first-repeat offer',
              },
              {
                tag: 'freq_none_12m',
                rule: 'No paid order in 12 months',
                use: 'Re-activation campaign',
              },
            ]}
          />

          <TagRuleTable
            caption="From 訂單紀錄 — product preference (商品類別)"
            rows={[
              {
                tag: 'pref_ticket',
                rule: 'Majority of spend on tickets / 票券',
                use: 'Match promos, season packages',
              },
              {
                tag: 'pref_apparel',
                rule: 'Majority on apparel / 服飾',
                use: 'Jersey drops, merch bundles',
              },
              {
                tag: 'pref_mixed',
                rule: 'Meaningful spend in 2+ categories',
                use: 'Cross-sell (“complete your fan kit”)',
              },
              {
                tag: 'buyer_ticket_only',
                rule: 'Tickets only, never apparel',
                use: 'Introduce merch with ticket bundle',
              },
            ]}
          />

          <TagRuleTable
            caption="From 訂單紀錄 — spend & recency"
            rows={[
              {
                tag: 'spend_vip',
                rule: 'Top 10% by 12-month 總計 or 小計',
                use: 'VIP events, premium seating',
              },
              {
                tag: 'recent_30d',
                rule: 'Last 訂單時間 within 30 days',
                use: 'Thank-you, review ask',
              },
              {
                tag: 'lapsed_90d',
                rule: 'Last order 90–180 days ago',
                use: '“We miss you” + coupon',
              },
              {
                tag: 'churn_risk_180d',
                rule: 'No order in 180+ days',
                use: 'Aggressive win-back',
              },
            ]}
          />

          <TagRuleTable
            caption="From 會員名單 — demographics & channel"
            rows={[
              {
                tag: 'age_18_24',
                rule: '生日 → age 18–24',
                use: 'Student / youth offers',
              },
              {
                tag: 'member_new',
                rule: '加入時間 within last 90 days',
                use: 'Onboarding series',
              },
              {
                tag: 'has_line',
                rule: 'LINE UID is not empty',
                use: 'LINE push channel',
              },
              {
                tag: 'email_only',
                rule: 'Email present, no LINE',
                use: 'Email journey',
              },
            ]}
          />
        </Section>

        <Section id="example" title="Worked example: one volleyball fan">
          <p>
            Member <code className="rounded bg-slate-100 px-1">FAN-1001</code> placed these orders:
          </p>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-2 text-left">訂單時間</th>
                  <th className="px-4 py-2 text-left">商品類別</th>
                  <th className="px-4 py-2 text-left">小計</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {[
                  ['2025/09/01', '票券', '1,200'],
                  ['2025/10/15', '票券', '800'],
                  ['2025/11/20', '服飾', '1,500'],
                  ['2026/01/10', '票券', '600'],
                ].map(([date, cat, amt]) => (
                  <tr key={date}>
                    <td className="px-4 py-2">{date}</td>
                    <td className="px-4 py-2">{cat}</td>
                    <td className="px-4 py-2">{amt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>You might assign:</p>
          <p className="font-mono text-sm text-indigo-800">
            freq_high, pref_ticket, pref_mixed, recent_30d, spend_core
          </p>
          <div className="rounded-lg border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100">
            <pre>{`歸戶碼,標籤\nFAN-1001,"freq_high,pref_ticket,pref_mixed,recent_30d,spend_core"`}</pre>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm">
            <p className="font-medium text-emerald-900">Campaign ideas</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-emerald-800">
              <li>
                <code className="text-xs">freq_high</code> +{' '}
                <code className="text-xs">pref_ticket</code> → season ticket early access
              </li>
              <li>
                <code className="text-xs">pref_mixed</code> +{' '}
                <code className="text-xs">recent_30d</code> → jersey bundle on next match day
              </li>
              <li>
                <code className="text-xs">freq_none_12m</code> + past ticket buyer → win-back
                single-game offer
              </li>
            </ul>
          </div>
        </Section>

        <Section id="segments" title="Combining tags into audiences">
          <p>
            Tags are building blocks. Audiences are usually <strong>AND / OR</strong> combinations
            in your CDP or campaign tool:
          </p>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-2 text-left">Audience</th>
                  <th className="px-4 py-2 text-left">Tag logic</th>
                  <th className="px-4 py-2 text-left">Intent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {[
                  ['Hot ticket buyers', 'pref_ticket AND freq_high', 'Season pass conversion'],
                  ['Merch upsell pool', 'pref_ticket AND NOT pref_apparel', 'Cross-sell apparel'],
                  ['Young high spenders', 'age_18_24 AND spend_vip', 'Exclusive drops'],
                  ['Sleepy VIPs', 'spend_vip AND lapsed_90d', 'Personal win-back'],
                ].map(([name, logic, intent]) => (
                  <tr key={name}>
                    <td className="px-4 py-2 font-medium">{name}</td>
                    <td className="px-4 py-2 font-mono text-xs">{logic}</td>
                    <td className="px-4 py-2 text-slate-600">{intent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">Good tagging habits</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>Every tag should tie to a real campaign — not “nice to know” only.</li>
            <li>Keep tag names stable; document the rule next to each name.</li>
            <li>Refresh tags after each order import (weekly or monthly).</li>
            <li>Use mutually exclusive buckets where possible (freq_high vs freq_mid).</li>
            <li>Use age/gender tags only where compliant; prefer brackets over exact ages.</li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Full product spec: see <code className="rounded bg-slate-100 px-1">PRD.md</code> in the
            repository.
          </p>
        </section>
      </div>
    </GuideLayout>
  )
}
