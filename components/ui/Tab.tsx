import clsx from "clsx";

interface Tab {
    value: string,
    label: string
}

interface TabProps {
    value: string;
    label: string;
    tabs: Tab[];
    onSelect: (value: string) => void;
}

const Tab: React.FC<TabProps> = ({ value, label, tabs, onSelect }) => {
    return (
        <div className="isolate w-full overflow-x-auto overflow-y-hidden">
            <div
                className={clsx('flex items-center', ['border-b border-neutral-300'])}>
                <nav aria-label={label} className="flex gap-6">
                    {tabs.map((tabItem) => {
                        const { label: tabItemLabel, value: tabItemValue } = tabItem;
                        const isSelected = tabItemValue === value;
                        const commonProps = {
                            children: (
                                <span
                                    className={clsx(
                                        "flex items-center transition-all",
                                        "font-medium text-base",
                                        isSelected ? "text-indigo-700" : "text-neutral-600")}
                                >
                                    {tabItemLabel}
                                </span>),
                            className: clsx(
                                "px-2 pb-[11px] whitespace-nowrap z-10 transition",
                                isSelected ? "-mb-px" : "",
                                isSelected &&
                                'border border-x-0 border-t-0 border-b-indigo-600',
                            ),
                            onClick: () => onSelect?.(tabItemValue)
                        }
                        return (
                            <button
                                key={String(tabItemValue)}
                                type="button"
                                {...commonProps}
                            />
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}

export default Tab