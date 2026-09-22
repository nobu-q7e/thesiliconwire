// Article Registry for The Silicon Wire
// To add a new article: add an entry to `articles` below, then push its id to `articleOrder`.
        const articles = {
            rufus: {
                category: 'Exclusive Investigation',
                cardCategory: 'AI & Frontier',
                title: "Single User Rufus Brown Reportedly Responsible for 60% of Anthropic's Global Revenue",
                subtitle: "Inside the astonishing server logs revealing how one man's relentless Claude usage is single-handedly subsidizing the future of artificial intelligence.",
                excerpt: "Documents leaked to The Silicon Wire reveal one San Francisco power user is quietly propping up a $40 billion AI company.",
                author: 'By Julian Vance',
                meta: 'September 17, 2026 • 8 min read',
                avatarSrc: 'https://placehold.co/100x100/0f172a/ffffff?text=JD',
                avatarAlt: 'Julian Vance',
                cardIcon: 'fa-solid fa-server',
                cardGradient: 'from-slate-900 via-[#1e1b4b] to-black',
                heroHTML: `
                    <div class="w-full h-64 md:h-[400px] bg-gradient-to-br from-slate-900 via-[#1e1b4b] to-black rounded-lg relative overflow-hidden flex items-center justify-center border border-gray-800">
                        <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#4f46e5 1px, transparent 1px); background-size: 20px 20px;"></div>
                        <div class="z-10 text-center">
                            <i class="fa-solid fa-server text-6xl text-indigo-500/50 mb-4 animate-pulse"></i>
                            <h3 class="text-white font-mono font-bold text-2xl tracking-widest drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]">NODE: RUFUS_CLUSTER_01</h3>
                            <p class="text-indigo-300 font-mono text-sm mt-2">CAPACITY: 104% | OVERRIDE: ACTIVE</p>
                        </div>
                        <div class="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1 text-xs font-mono text-green-400 border border-green-900 rounded">
                            <i class="fa-solid fa-circle text-[8px] animate-pulse mr-1"></i> LOGGING
                        </div>
                    </div>
                    <figcaption class="text-xs text-gray-500 mt-2 font-sans">
                        Visualization of the dedicated Anthropic server rack assigned exclusively to Rufus Brown's account. (Graphic: The Silicon Wire)
                    </figcaption>
                `,
                bodyHTML: `
                    <p class="drop-cap">
                        In what financial historians are already calling the most precarious dependency structure in Silicon Valley history, documents leaked to <em>The Silicon Wire</em> reveal that generative AI powerhouse Anthropic derives 60.4% of its annualized revenue from a single individual: San Francisco resident Rufus Brown.
                    </p>
                    <p>
                        While analysts spent months debating whether corporate enterprise contracts or mass consumer adoption would crown the winner of the AI arms race, the answer appears to be neither. Instead, it is Mr. Brown, a power user whose relentless, round-the-clock API calls and complex multi-agent workflows have inadvertently made him the financial backbone of a company recently valued at nearly $40 billion.
                    </p>

                    <blockquote class="border-l-4 border-brand-red pl-6 py-2 my-8 italic text-2xl font-serif text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
                        "We initially flagged his IP address thinking it was a coordinated state-sponsored DDoS attack. Then we realized he was just asking Claude to refactor his CSS for the 4,000th time today."
                        <footer class="text-sm font-sans text-gray-500 dark:text-gray-400 not-italic mt-3 font-bold">— Anonymous Anthropic Infrastructure Lead</footer>
                    </blockquote>

                    <p>
                        According to internal Slack channels seen by this publication, Brown's usage is so catastrophic to the standard compute cluster that Anthropic engineers were forced to quietly provision a dedicated, liquid-cooled server farm in Oregon purely to handle his prompt queue.
                    </p>

                    <div class="my-10 bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden font-sans">
                        <div class="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-red-500 cursor-blink"></div>
                                <h4 class="text-white font-bold text-sm tracking-widest uppercase">Live Rufus Tracker</h4>
                            </div>
                            <span class="text-[10px] text-slate-400 font-mono">TELEMETRY_LINK_ACTIVE</span>
                        </div>
                        <div class="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div class="text-center sm:text-left">
                                <p class="text-slate-400 text-xs font-bold uppercase mb-1">Tokens Processed (Today)</p>
                                <div id="live-tokens" class="text-3xl font-mono font-bold text-indigo-400 tabular-nums">8,402,110</div>
                                <p class="text-[10px] text-indigo-500/70 mt-1">↑ 412K/min</p>
                            </div>
                            <div class="text-center sm:text-left border-t sm:border-t-0 sm:border-l border-slate-700 pt-4 sm:pt-0 sm:pl-6">
                                <p class="text-slate-400 text-xs font-bold uppercase mb-1">Active Agent Workflows</p>
                                <div id="live-workflows" class="text-3xl font-mono font-bold text-teal-400 tabular-nums">1,402</div>
                                <p class="text-[10px] text-teal-500/70 mt-1">Spawning exponentially</p>
                            </div>
                            <div class="text-center sm:text-left border-t sm:border-t-0 sm:border-l border-slate-700 pt-4 sm:pt-0 sm:pl-6">
                                <p class="text-slate-400 text-xs font-bold uppercase mb-1">Est. Revenue Generated</p>
                                <div id="live-revenue" class="text-3xl font-mono font-bold text-green-400 tabular-nums">$4,291.50</div>
                                <p class="text-[10px] text-green-500/70 mt-1">Charging per second</p>
                            </div>
                        </div>
                        <div class="bg-black/50 px-4 py-2 font-mono text-[10px] text-gray-500">
                            <span class="text-green-500">></span> SYS_LOG: <span id="terminal-log">Rufus is currently attempting to build a SaaS platform inside a single prompt...</span>
                        </div>
                    </div>

                    <h3 class="text-2xl font-sans font-bold text-gray-900 dark:text-white mt-8 mb-4">The "Rufus Risk Factor"</h3>
                    <p>
                        Wall Street is panicking. As Anthropic prepares for a highly anticipated IPO next year, underwriters have reportedly introduced a new metric into their financial models: the <strong>Rufus Concentration Risk (RCR)</strong>.
                    </p>
                    <p>
                        "If Rufus Brown ever decides to take a vacation, go camping without cell service, or God forbid, switch to a local open-source model, Anthropic's quarterly projections will instantly crater," explained a senior analyst at Goldman Sachs. "We've advised the board to wrap this man in bubble wrap and assign a private security detail to his home router."
                    </p>
                    <p>
                        Company leadership has declined to comment directly on individual users, though rumors persist that CEO Dario Amodei has personally drafted a new subscription tier titled <em>"Claude Max Unlimited (Rufus Edition)"</em> just to prevent billing limits from severing the company's primary cash flow.
                    </p>
                    <p>
                        When reached for comment via a rare brief interlude on Discord, Brown seemed unaware of his systemic importance. "I just really like the sonnet 3.5 coding capabilities," he wrote. "Hold on, I need to spin up 40 more agents to debug this python script."
                    </p>
                `,
                tagsHTML: `
                    <span class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Artificial Intelligence</span>
                    <span class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Anthropic</span>
                    <span class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Cloud Compute</span>
                    <span class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Venture Capital</span>
                `
            },
            chawe: {
                category: 'Gaming / Server Chaos',
                cardCategory: 'Gaming',
                title: "Streamer 'chawe42' Crashes Every Donut SMP Server After Entire Playerbase Instantly Teleports to Him",
                subtitle: "What began as a routine stream from a little-known school-age content creator turned into the largest mass-teleportation event in Minecraft server history — and network engineers still can't explain how.",
                excerpt: "Every player on Donut SMP teleported to the same coordinates within eleven seconds of each other, and the network hasn't recovered since.",
                author: 'By Priya Anand',
                meta: 'September 17, 2026 • 6 min read',
                avatarSrc: 'https://placehold.co/100x100/166534/ffffff?text=C42',
                avatarAlt: 'chawe42',
                cardIcon: 'fa-solid fa-cubes',
                cardGradient: 'from-emerald-950 via-[#0f2e1b] to-black',
                heroHTML: `
                    <div class="w-full h-64 md:h-[400px] bg-gradient-to-br from-emerald-950 via-[#0f2e1b] to-black rounded-lg relative overflow-hidden flex items-center justify-center border border-gray-800">
                        <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#22c55e 1px, transparent 1px); background-size: 20px 20px;"></div>
                        <div class="z-10 text-center">
                            <i class="fa-solid fa-cubes text-6xl text-emerald-500/50 mb-4 animate-pulse"></i>
                            <h3 class="text-white font-mono font-bold text-2xl tracking-widest drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">NODE: DONUT_SMP_MAIN</h3>
                            <p class="text-emerald-300 font-mono text-sm mt-2">STATUS: OFFLINE | CAUSE: chawe42</p>
                        </div>
                        <div class="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1 text-xs font-mono text-red-400 border border-red-900 rounded">
                            <i class="fa-solid fa-circle text-[8px] animate-pulse mr-1"></i> SERVER DOWN
                        </div>
                    </div>
                    <figcaption class="text-xs text-gray-500 mt-2 font-sans">
                        Server status dashboard moments before Donut SMP's main world went fully unresponsive. (Graphic: The Silicon Wire)
                    </figcaption>
                `,
                bodyHTML: `
                    <p class="drop-cap">
                        At 4:12 PM Eastern on Wednesday, every one of Donut SMP's fourteen regional worlds recorded the exact same anomaly within eleven seconds of each other: every single online player teleported, without warning, to the coordinates of one account. That account belonged to a relatively unknown streamer known only by the handle <strong>chawe42</strong>.
                    </p>
                    <p>
                        Donut SMP, one of the most-watched Minecraft survival servers on Twitch and YouTube, has weathered griefers, duping exploits, and the occasional rogue admin. None of it compares to what moderators are now calling "the pull" — a mass, simultaneous teleportation event that instantly funneled tens of thousands of concurrent players into a single sixteen-block radius, collapsing chunk loading and taking down the server's backend within minutes.
                    </p>

                    <blockquote class="border-l-4 border-brand-red pl-6 py-2 my-8 italic text-2xl font-serif text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
                        "We checked the anti-cheat logs assuming it was a coordinated hacked-client raid. There was no exploit. Every player's coordinates just became his coordinates at the same tick. We don't have a command for that."
                        <footer class="text-sm font-sans text-gray-500 dark:text-gray-400 not-italic mt-3 font-bold">— Donut SMP Network Administrator, speaking anonymously</footer>
                    </blockquote>

                    <p>
                        Server engineers scrambled to isolate the region, but with the entire playerbase now rendering inside the same handful of chunks, entity processing overloaded within minutes. Item frames, minecarts, and hundreds of thousands of dropped items compounded the load until the main world thread locked up entirely, taking chat, the in-game economy plugin, and three affiliated Discord bots down with it.
                    </p>

                    <div class="my-10 bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden font-sans">
                        <div class="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-red-500 cursor-blink"></div>
                                <h4 class="text-white font-bold text-sm tracking-widest uppercase">Live Donut SMP Crash Tracker</h4>
                            </div>
                            <span class="text-[10px] text-slate-400 font-mono">TELEMETRY_LINK_ACTIVE</span>
                        </div>
                        <div class="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div class="text-center sm:text-left">
                                <p class="text-slate-400 text-xs font-bold uppercase mb-1">Players Teleported</p>
                                <div id="live-teleports" class="text-3xl font-mono font-bold text-emerald-400 tabular-nums">41,208</div>
                                <p class="text-[10px] text-emerald-500/70 mt-1">↑ Still pulling</p>
                            </div>
                            <div class="text-center sm:text-left border-t sm:border-t-0 sm:border-l border-slate-700 pt-4 sm:pt-0 sm:pl-6">
                                <p class="text-slate-400 text-xs font-bold uppercase mb-1">Server TPS (of 20)</p>
                                <div id="live-tps" class="text-3xl font-mono font-bold text-red-400 tabular-nums">2.4</div>
                                <p class="text-[10px] text-red-500/70 mt-1">Ticking down toward 0</p>
                            </div>
                            <div class="text-center sm:text-left border-t sm:border-t-0 sm:border-l border-slate-700 pt-4 sm:pt-0 sm:pl-6">
                                <p class="text-slate-400 text-xs font-bold uppercase mb-1">Regional Servers Down</p>
                                <div id="live-crashed" class="text-3xl font-mono font-bold text-teal-400 tabular-nums">6 / 14</div>
                                <p class="text-[10px] text-teal-500/70 mt-1">Cascading offline</p>
                            </div>
                        </div>
                        <div class="bg-black/50 px-4 py-2 font-mono text-[10px] text-gray-500">
                            <span class="text-green-500">></span> SYS_LOG: <span id="terminal-log-chawe">Chunk loader queue backing up around spawn coordinates...</span>
                        </div>
                    </div>

                    <h3 class="text-2xl font-sans font-bold text-gray-900 dark:text-white mt-8 mb-4">The chawe42 Effect</h3>
                    <p>
                        Little is publicly known about chawe42 beyond a handful of clips and a small but devoted following built around low-key, unscripted survival streams. Viewers who caught the moment live say nothing in his stream setup suggested anything unusual — he was mid-sentence, mining quietly, when chat began flooding with reports of sudden teleportation from every corner of the map.
                    </p>
                    <p>
                        Server plugin developers have combed through the available logs and found no console commands, no known teleport plugin triggers, and no third-party mod signatures consistent with the event. "Functionally, it behaves like a server-wide <code>/tp @a</code> command," one plugin developer who reviewed partial logs told <em>The Silicon Wire</em>, "except nobody with permission to run it did, and it hit every regional shard at once, which shouldn't be technically possible on this architecture."
                    </p>
                    <p>
                        Reached briefly through a moderator during a break in troubleshooting, chawe42 said he had no explanation either. "I was just building a dirt house," he said. "Then my game lagged out because, I guess, everyone was standing on top of me."
                    </p>
                    <p>
                        Donut SMP's operators say the network will remain offline while they investigate, and have not ruled out a full world rollback. In the meantime, chawe42's stream has gone from a few hundred regular viewers to one of the most-watched channels on the platform, with clips of "the pull" spreading rapidly across gaming forums and social media.
                    </p>
                `,
                tagsHTML: `
                    <span class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Gaming</span>
                    <span class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Minecraft</span>
                    <span class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Livestreaming</span>
                    <span class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Server Infrastructure</span>
                `
            },
            classic: {
                category: 'Gaming / Server Fire',
                cardCategory: 'Gaming',
                title: "World's Biggest Terraria Glazer 'Average Classic' Loads Unregistered Mod, Sets Terraria Server Rooms on Fire",
                subtitle: "A single unlisted mod file, loaded by the game's most devoted defender, pushed dedicated server hardware past its thermal limits and triggered a literal fire. He maintains the game is still perfect.",
                excerpt: "One unregistered mod, one extremely loyal fan, and several racks of servers that are now mostly smoke.",
                author: 'By Marcus Oyelaran',
                meta: 'September 18, 2026 • 5 min read',
                avatarSrc: 'https://placehold.co/100x100/7c2d12/ffffff?text=AC',
                avatarAlt: 'Average Classic',
                cardIcon: 'fa-solid fa-fire',
                cardGradient: 'from-orange-950 via-[#2e1508] to-black',
                heroHTML: `
                    <div class="w-full h-64 md:h-[400px] bg-gradient-to-br from-orange-950 via-[#2e1508] to-black rounded-lg relative overflow-hidden flex items-center justify-center border border-gray-800">
                        <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#f97316 1px, transparent 1px); background-size: 20px 20px;"></div>
                        <div class="z-10 text-center">
                            <i class="fa-solid fa-fire text-6xl text-orange-500/60 mb-4 animate-pulse"></i>
                            <h3 class="text-white font-mono font-bold text-2xl tracking-widest drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]">NODE: TERRARIA_RACK_07</h3>
                            <p class="text-orange-300 font-mono text-sm mt-2">STATUS: ON FIRE | CAUSE: Average Classic</p>
                        </div>
                        <div class="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1 text-xs font-mono text-red-400 border border-red-900 rounded">
                            <i class="fa-solid fa-circle text-[8px] animate-pulse mr-1"></i> SUPPRESSION ACTIVE
                        </div>
                    </div>
                    <figcaption class="text-xs text-gray-500 mt-2 font-sans">
                        The last thermal reading from Rack 07 before the sensor itself melted. (Graphic: The Silicon Wire)
                    </figcaption>
                `,
                bodyHTML: `
                    <p class="drop-cap">
                        Firefighters were called to a Terraria server facility early Friday morning after a player known online as Average Classic — widely regarded as the single most enthusiastic Terraria glazer on Earth — loaded an unregistered mod that drove an entire row of server racks past their thermal limits and into open flame.
                    </p>
                    <p>
                        Average Classic, who has described Terraria as "the only game" and once posted a 9,000-word forum thread arguing that the Zenith is "historically underrated," reportedly obtained the mod from an unlisted file share. It was not on any mod browser, carried no author name, and had a file size one engineer described as "frankly rude."
                    </p>

                    <blockquote class="border-l-4 border-brand-red pl-6 py-2 my-8 italic text-2xl font-serif text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
                        "The mod spawned every boss at once, then spawned every boss again for each boss. We watched the CPU temperature graph turn into a vertical line. Then the graph stopped, because the thing drawing the graph was on fire."
                        <footer class="text-sm font-sans text-gray-500 dark:text-gray-400 not-italic mt-3 font-bold">— Server technician, speaking from the parking lot</footer>
                    </blockquote>

                    <p>
                        According to logs recovered before the blaze, the mod registered itself under no ID at all, which let it bypass every safety check that depends on knowing a mod exists. Within ninety seconds, entity counts exceeded what staff believed the engine could represent as a number.
                    </p>

                    <div class="my-10 bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden font-sans">
                        <div class="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-red-500 cursor-blink"></div>
                                <h4 class="text-white font-bold text-sm tracking-widest uppercase">Live Server Room Fire Tracker</h4>
                            </div>
                            <span class="text-[10px] text-slate-400 font-mono">TELEMETRY_LINK_SMOLDERING</span>
                        </div>
                        <div class="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div class="text-center sm:text-left">
                                <p class="text-slate-400 text-xs font-bold uppercase mb-1">Rack Temperature</p>
                                <div id="live-temp" class="text-3xl font-mono font-bold text-orange-400 tabular-nums">412.0°C</div>
                                <p class="text-[10px] text-orange-500/70 mt-1">↑ Hotter than the Underworld</p>
                            </div>
                            <div class="text-center sm:text-left border-t sm:border-t-0 sm:border-l border-slate-700 pt-4 sm:pt-0 sm:pl-6">
                                <p class="text-slate-400 text-xs font-bold uppercase mb-1">Bosses Spawned</p>
                                <div id="live-bosses" class="text-3xl font-mono font-bold text-red-400 tabular-nums">1,204,880</div>
                                <p class="text-[10px] text-red-500/70 mt-1">Mostly Moon Lords</p>
                            </div>
                            <div class="text-center sm:text-left border-t sm:border-t-0 sm:border-l border-slate-700 pt-4 sm:pt-0 sm:pl-6">
                                <p class="text-slate-400 text-xs font-bold uppercase mb-1">Racks On Fire</p>
                                <div id="live-racks" class="text-3xl font-mono font-bold text-yellow-400 tabular-nums">7 / 22</div>
                                <p class="text-[10px] text-yellow-500/70 mt-1">Spreading like the Corruption</p>
                            </div>
                        </div>
                        <div class="bg-black/50 px-4 py-2 font-mono text-[10px] text-gray-500">
                            <span class="text-green-500">></span> SYS_LOG: <span id="terminal-log-classic">Unknown mod "????.tmod" requesting 64 GB of RAM...</span>
                        </div>
                    </div>

                    <h3 class="text-2xl font-sans font-bold text-gray-900 dark:text-white mt-8 mb-4">"Still a 10/10"</h3>
                    <p>
                        No injuries were reported. The building's suppression system contained the fire to a single hall, though staff confirmed that several machines "will not be journeying to the end of anything."
                    </p>
                    <p>
                        Average Classic, for his part, has not wavered. In a statement posted while the facility was still being ventilated, he called the incident "proof of how deep the game's systems go" and noted that no other sandbox title has ever been powerful enough to combust its own infrastructure. "Minecraft could never," he added.
                    </p>
                    <p>
                        Asked whether he would load an unregistered mod again, he said he already had. "It's a different one. This one only adds a fishing rod. I think."
                    </p>
                    <p>
                        Multiplayer services are expected to return once replacement hardware arrives and someone works out how to delete a mod that does not, technically, exist.
                    </p>
                `,
                tagsHTML: `
                    <span class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Gaming</span>
                    <span class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Terraria</span>
                    <span class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Modding</span>
                    <span class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Server Infrastructure</span>
                `
            },
            maksim: {
                category: 'Gaming / Real-World Incident',
                cardCategory: 'Gaming',
                title: "Roblox Player 'monkeymaksim13' Falls Off Ladder Attempting to Recreate 'Steal an Egg' in Real Life",
                subtitle: "The reigning high-score holder in the viral egg-heist game tried to bring the grind offline for a content clip. The ladder did not cooperate.",
                excerpt: "Known for topping the leaderboard in 'Steal an Egg,' monkeymaksim13 decided a real nest would make better content than a virtual one.",
                author: 'By Renee Castillo',
                meta: 'September 19, 2026 • 4 min read',
                avatarSrc: 'https://placehold.co/100x100/365314/ffffff?text=MM13',
                avatarAlt: 'monkeymaksim13',
                cardIcon: 'fa-solid fa-egg',
                cardGradient: 'from-lime-950 via-[#1a2e05] to-black',
                heroHTML: `
                    <div class="w-full h-64 md:h-[400px] bg-gradient-to-br from-lime-950 via-[#1a2e05] to-black rounded-lg relative overflow-hidden flex items-center justify-center border border-gray-800">
                        <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#84cc16 1px, transparent 1px); background-size: 20px 20px;"></div>
                        <div class="z-10 text-center">
                            <i class="fa-solid fa-egg text-6xl text-lime-500/60 mb-4 animate-pulse"></i>
                            <h3 class="text-white font-mono font-bold text-2xl tracking-widest drop-shadow-[0_0_10px_rgba(132,204,22,0.8)]">INCIDENT: LADDER_EGG_01</h3>
                            <p class="text-lime-300 font-mono text-sm mt-2">STATUS: GROUNDED | EGGS SECURED: 0</p>
                        </div>
                        <div class="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1 text-xs font-mono text-yellow-400 border border-yellow-900 rounded">
                            <i class="fa-solid fa-triangle-exclamation text-[8px] animate-pulse mr-1"></i> INCIDENT LOGGED
                        </div>
                    </div>
                    <figcaption class="text-xs text-gray-500 mt-2 font-sans">
                        A neighbor's doorbell camera caught the entire attempt, ladder wobble included. (Graphic: The Silicon Wire)
                    </figcaption>
                `,
                bodyHTML: `
                    <p class="drop-cap">
                        monkeymaksim13, the streamer widely regarded as the best "Steal an Egg" player alive, spent Thursday afternoon proving that a skill built entirely inside a Roblox server does not, in fact, transfer to a backyard. He climbed an aluminum extension ladder toward a nest in a neighbor's tree, reached for the egg, and fell approximately eleven feet onto a flowerbed, live on stream.
                    </p>
                    <p>
                        "Steal an Egg," the game that made him famous, tasks players with sneaking into rival bases to swipe rare eggs while avoiding motion sensors and guard NPCs — a formula maksim has mastered so thoroughly that his leaderboard rank has gone unchallenged for eleven straight weeks. For his latest video, titled simply "IRL EGG RUN (no cap)," he decided the natural next step was doing it for real.
                    </p>

                    <blockquote class="border-l-4 border-brand-red pl-6 py-2 my-8 italic text-2xl font-serif text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
                        "I heard him yell 'no lag this time' right before the ladder started leaning. There was, in fact, lag. Just not the kind he meant."
                        <footer class="text-sm font-sans text-gray-500 dark:text-gray-400 not-italic mt-3 font-bold">— Neighbor, watching from the driveway</footer>
                    </blockquote>

                    <p>
                        Chat had been begging him to "just clip in already" for several minutes as he adjusted the ladder's footing on uneven grass — a detail several viewers later pointed out has no equivalent difficulty setting in the game. Maksim made it to the second-to-top rung, stretched toward the nest, and the ladder shifted out from under him. The egg, witnesses confirmed, was untouched.
                    </p>

                    <div class="my-10 bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden font-sans">
                        <div class="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-red-500 cursor-blink"></div>
                                <h4 class="text-white font-bold text-sm tracking-widest uppercase">Live Field Incident Tracker</h4>
                            </div>
                            <span class="text-[10px] text-slate-400 font-mono">TELEMETRY_LINK_ACTIVE</span>
                        </div>
                        <div class="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div class="text-center sm:text-left">
                                <p class="text-slate-400 text-xs font-bold uppercase mb-1">Eggs Successfully Stolen</p>
                                <div id="live-eggs" class="text-3xl font-mono font-bold text-red-400 tabular-nums">0</div>
                                <p class="text-[10px] text-red-500/70 mt-1">Still zero. Run failed.</p>
                            </div>
                            <div class="text-center sm:text-left border-t sm:border-t-0 sm:border-l border-slate-700 pt-4 sm:pt-0 sm:pl-6">
                                <p class="text-slate-400 text-xs font-bold uppercase mb-1">Estimated Fall Height</p>
                                <div id="live-fallheight" class="text-3xl font-mono font-bold text-yellow-400 tabular-nums">11.0 ft</div>
                                <p class="text-[10px] text-yellow-500/70 mt-1">Re-measured with every replay</p>
                            </div>
                            <div class="text-center sm:text-left border-t sm:border-t-0 sm:border-l border-slate-700 pt-4 sm:pt-0 sm:pl-6">
                                <p class="text-slate-400 text-xs font-bold uppercase mb-1">Clip Replays</p>
                                <div id="live-replays" class="text-3xl font-mono font-bold text-lime-400 tabular-nums">184,204</div>
                                <p class="text-[10px] text-lime-500/70 mt-1">Climbing faster than he did</p>
                            </div>
                        </div>
                        <div class="bg-black/50 px-4 py-2 font-mono text-[10px] text-gray-500">
                            <span class="text-green-500">></span> SYS_LOG: <span id="terminal-log-maksim">Bird has not left the area. Bird seems fine with this...</span>
                        </div>
                    </div>

                    <h3 class="text-2xl font-sans font-bold text-gray-900 dark:text-white mt-8 mb-4">The Grind Doesn't Stop</h3>
                    <p>
                        Maksim was treated for minor bruising and a sprained wrist and released the same evening. No birds, eggs, or nests were harmed in the incident. Local wildlife officials have asked, gently but firmly, that content creators leave real nests to real birds going forward.
                    </p>
                    <p>
                        True to form, Maksim posted an update from his couch, ice pack in one hand, phone in the other. "Run didn't count anyway, I fell before the pickup animation triggered," he said. "Respawning tomorrow. Different tree. Bigger ladder."
                    </p>
                    <p>
                        His leaderboard rank in "Steal an Egg" remains unaffected. As one commenter put it, "he's still undefeated in the game that doesn't have fall damage."
                    </p>
                `,
                tagsHTML: `
                    <span class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Gaming</span>
                    <span class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Roblox</span>
                    <span class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Viral</span>
                    <span class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition">Content Creation</span>
                `
            }
        };

        // Controls the order (and therefore which cards appear first) on the home screen.
        // To add a new article: add it to `articles` above, then push its id here.
        const articleOrder = ['maksim', 'classic', 'chawe', 'rufus'];
