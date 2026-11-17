import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockStoreData';
import { FaqItem } from '../types/store';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

const TOPICS: Array<'All' | FaqItem['topic']> = [
  'All',
  'Ordering',
  'Products',
  'Delivery',
  'Payments',
  'Returns',
  'Accounts',
  'Order Tracking',
];

export function FaqPage() {
  const [selectedTopic, setSelectedTopic] = useState<'All' | FaqItem['topic']>('All');
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const visible =
    selectedTopic === 'All'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.topic === selectedTopic);

  return (
    <div className="w-[var(--w)] mx-auto pt-[98px] md:pt-[11.5vh] pb-12 space-y-[var(--gap)]">
      <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />

      <div className="bg-white rounded-[14px] p-6 md:p-8">
        <p className="text-xs font-semibold text-[#5a5d76]">Illustrative Answers — Pending Policy Approval</p>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#16193a] mt-1">
          Help &amp; Frequently Asked Questions
        </h1>

        <div className="mt-5 flex flex-wrap gap-2">
          {TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => setSelectedTopic(topic)}
              className={`h-9 px-4 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                selectedTopic === topic
                  ? 'bg-[#141a4a] text-white'
                  : 'bg-[#e9e7df] text-[#16193a] hover:bg-[#f7d23a]'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[14px] p-6 md:p-8 divide-y divide-[#16193a]/10">
        {visible.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="py-4">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? '' : item.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
              >
                <div>
                  <span className="text-[11px] font-semibold text-[#3a49c9]">{item.topic}</span>
                  <h2 className="text-base font-semibold text-[#16193a] mt-0.5">{item.question}</h2>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#16193a] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <p className="mt-3 text-sm text-[#5a5d76] leading-relaxed max-w-[75ch]">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
