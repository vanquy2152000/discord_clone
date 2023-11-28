import { redirect } from 'next/navigation'
import { UserButton } from '@clerk/nextjs';

import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ModeToggle } from '@/components/mode-toggle';
import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile'

import { NavigationAction } from './navigation-action';
import { NavigationItem } from './navigation-item';

export const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    console.log('servers :', servers);


    return (
        <div className='space-y-4 flex flex-col items-center w-full h-full text-primary dark:bg-[#1E1F22] py-3'>
            <NavigationAction />
            <Separator className='w-10 h-[2px] mx-auto rounded-md bg-zinc-300 dark:bg-slate-700' />
            <ScrollArea className='flex-1 w-full'>
                {
                    servers.map((server) => (
                        <div key={server.id} className='mb-4'>
                            <NavigationItem
                                id={server.id}
                                imageUrl={server.imageUrl}
                                name={server.name}
                            />
                        </div>
                    ))
                }
            </ScrollArea>
            <div className='pb-3 mt-auto flex flex-col items-center gap-y-4'>
                <ModeToggle />
                <UserButton
                    afterSignOutUrl='/'
                    appearance={{
                        elements: {
                            avatarBox: "w-[48px] h-[48px]"
                        }
                    }}
                />
            </div>
        </div >
    )
}