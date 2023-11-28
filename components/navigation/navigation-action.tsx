"use client"

import { Plus } from "lucide-react"

import { ActionTooltip } from "@/components/action-tooltip"
import { useModal } from "@/hook/use-modal-store"

export const NavigationAction = () => {
    const { onOpen } = useModal();

    return (
        <div>
            <ActionTooltip
                side="right"
                align="center"
                label="Add a server"
            >
                <button onClick={() => onOpen('createServer')} className='group flex items-center'>
                    <div className='flex items-center justify-center mx-3 w-12 h-12 rounded-[24px] group-hover:rounded-[16px] dark:bg-neutral-700 group-hover:bg-emerald-500 transition-all bg-background overflow-hidden'>
                        <Plus
                            className='text-emerald-500 group-hover:text-white transition'
                            size={25}
                        />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    )
}