// site.js — shared logic for every page of The Silicon Wire.
// Loaded after assets/js/articles-data.js (which defines `articles` and `articleOrder`).
// Each page calls initPage(categoryFilter) once, at the bottom of its own HTML,
// passing the section it belongs to (or null for the front page).

        // 1. Dark/Light Mode Logic
        function toggleTheme() {
            const html = document.documentElement;
            const icon = document.getElementById('theme-icon');
            
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                showToast("Switched to Light Mode");
            } else {
                html.classList.add('dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                showToast("Switched to Dark Mode");
            }
            syncGiscusTheme();
        }

        // 2. Custom Toast Notification System (replaces alerts)
        let toastTimeout;
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast-container');
            const toastMsg = document.getElementById('toast-message');
            const toastIcon = document.getElementById('toast-icon');
            
            // Set icon and color based on type
            if(type === 'success') {
                toastIcon.className = "fa-solid fa-circle-check text-green-500";
            } else if(type === 'info') {
                toastIcon.className = "fa-solid fa-circle-info text-blue-500";
            }

            toastMsg.innerText = message;
            
            // Show toast
            toast.classList.remove('toast-enter', 'pointer-events-none');
            toast.classList.add('toast-active');
            
            // Reset timeout
            clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => {
                toast.classList.remove('toast-active');
                toast.classList.add('toast-enter', 'pointer-events-none');
            }, 3000);
        }

        // 3. Text Size Adjuster
        let currentSizeBase = 18; // px
        function changeFontSize(direction) {
            const articleBody = document.getElementById('article-body');
            
            if (direction > 0 && currentSizeBase < 26) {
                currentSizeBase += 2;
            } else if (direction < 0 && currentSizeBase > 14) {
                currentSizeBase -= 2;
            }
            
            articleBody.style.fontSize = `${currentSizeBase}px`;
            
            const directionText = direction > 0 ? "Increased" : "Decreased";
            showToast(`Text size ${directionText}`);
        }

        // 4. Share Actions
        function triggerShare(type) {
            if (type === 'link') {
                // Simulate copying link to clipboard
                const dummy = document.createElement('input'), text = window.location.href;
                document.body.appendChild(dummy);
                dummy.value = text;
                dummy.select();
                document.execCommand('copy');
                document.body.removeChild(dummy);
                showToast("Article link copied to clipboard!");
            } else if (type === 'bookmark') {
                showToast("Article saved to your reading list.", "info");
            }
        }

        // 5a. Home Screen — renders one card per article in the registry.
        // Pass a categoryFilter (matching an article's cardCategory, e.g. "AI & Frontier")
        // to show only that section's stories; omit it (or pass null) to show everything.
        function renderHomeCards(categoryFilter) {
            const grid = document.getElementById('home-article-grid');
            const ids = articleOrder.filter(id => !categoryFilter || articles[id].cardCategory === categoryFilter);

            if (ids.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full text-center py-20 text-gray-400 dark:text-gray-600">
                        <i class="fa-solid fa-newspaper text-4xl mb-4"></i>
                        <p class="font-sans font-medium">No stories in this section yet. Check back soon.</p>
                    </div>
                `;
                return;
            }

            grid.innerHTML = ids.map(id => {
                const a = articles[id];
                return `
                    <div onclick="openArticle('${id}')" class="group cursor-pointer bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div class="h-40 bg-gradient-to-br ${a.cardGradient} relative flex items-center justify-center">
                            <i class="${a.cardIcon} text-5xl text-white/40"></i>
                            <span class="absolute top-3 left-3 bg-black/50 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">${a.cardCategory}</span>
                        </div>
                        <div class="p-5">
                            <h3 class="font-serif font-bold text-lg leading-snug text-gray-900 dark:text-white group-hover:text-brand-red transition mb-2">${a.title}</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-snug">${a.excerpt}</p>
                            <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800 pt-3">
                                <span>${a.meta}</span>
                                <span class="text-brand-red font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">Read <i class="fa-solid fa-arrow-right text-[10px]"></i></span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // 5b. Navigation between Home and Article views
        let currentStory = null;

        function renderStory(story) {
            document.getElementById('article-kicker').textContent = story.category;
            document.getElementById('article-title').innerHTML = story.title;
            document.getElementById('article-subtitle').innerHTML = story.subtitle;
            document.getElementById('article-avatar').src = story.avatarSrc;
            document.getElementById('article-avatar').alt = story.avatarAlt;
            document.getElementById('article-author').textContent = story.author;
            document.getElementById('article-meta').textContent = story.meta;
            document.getElementById('article-hero').innerHTML = story.heroHTML;
            document.getElementById('article-body').innerHTML = story.bodyHTML;
            document.getElementById('article-tags').innerHTML = story.tagsHTML;
            document.getElementById('article-body').style.fontSize = `${currentSizeBase}px`;
        }

        function openArticle(id) {
            if (!articles[id]) return;
            currentStory = id;
            renderStory(articles[id]);
            document.getElementById('home-view').classList.add('hidden');
            document.getElementById('article-view').classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast(`Now reading: ${articles[id].cardCategory}`, 'info');
            loadGiscus(id);
        }

        function showHome() {
            currentStory = null;
            document.getElementById('article-view').classList.add('hidden');
            document.getElementById('home-view').classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // 5c. Interactive Live Data Tracker (auto-detects which story's widget is on screen)
        let baseTokens = 8402110;
        let baseWorkflows = 1402;
        let baseRevenue = 4291.50;

        let baseTeleports = 41208;
        let baseTPS = 2.4;
        let baseCrashedServers = 6;

        const logMessages = [
            "Rufus is rewriting the React ecosystem from scratch...",
            "Context window expanded to 8 million tokens...",
            "Anthropic load balancer critical warning ignored...",
            "Rufus sub-agent 409 requesting direct database access...",
            "Invoicing $1.20 for complex Claude Opus reasoning..."
        ];

        const chaweLogMessages = [
            "Chunk loader queue backing up around spawn coordinates...",
            "Entity count in single chunk exceeds 40,000...",
            "Region file write lock timeout on shard 3...",
            "Discord economy bot disconnected: rate limited...",
            "Attempting emergency world save before shard 9 crash..."
        ];

        let baseTemp = 412.0;
        let baseBosses = 1204880;
        let baseRacks = 7;

        const classicLogMessages = [
            'Unknown mod "????.tmod" requesting 64 GB of RAM...',
            "Fan speed at 100%. Fans have asked to be excused...",
            "Spawning Moon Lord #880,412...",
            "Thermal paste reclassified as a liquid...",
            "Average Classic has rated this experience 10/10..."
        ];

        let baseFallHeight = 11.0;
        let baseClipReplays = 184204;

        const maksimLogMessages = [
            "Bird has not left the area. Bird seems fine with this...",
            "Ladder stability rating: theoretical...",
            "Chat requesting a rematch against the tree...",
            "Wrist brace shipping notification received...",
            "Nest remains fully intact and unimpressed..."
        ];

        function startLiveTracker() {
            setInterval(() => {
                if (currentStory === 'rufus') {
                    const tokensEl = document.getElementById('live-tokens');
                    if (!tokensEl) return;

                    const addedTokens = Math.floor(Math.random() * 500) + 100;
                    baseTokens += addedTokens;

                    if (Math.random() > 0.8) {
                        baseWorkflows += Math.floor(Math.random() * 3) - 1;
                    }

                    baseRevenue += (addedTokens * 0.0001);

                    tokensEl.innerText = baseTokens.toLocaleString();
                    document.getElementById('live-workflows').innerText = baseWorkflows.toLocaleString();
                    document.getElementById('live-revenue').innerText = '$' + baseRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});

                    if (Math.random() > 0.9) {
                        document.getElementById('terminal-log').innerText = logMessages[Math.floor(Math.random() * logMessages.length)];
                    }
                } else if (currentStory === 'chawe') {
                    const teleportsEl = document.getElementById('live-teleports');
                    if (!teleportsEl) return;

                    baseTeleports += Math.floor(Math.random() * 40) + 5;

                    baseTPS += (Math.random() * 0.3) - 0.22;
                    if (baseTPS < 0) baseTPS = 0;
                    if (baseTPS > 20) baseTPS = 20;

                    if (Math.random() > 0.93 && baseCrashedServers < 14) {
                        baseCrashedServers += 1;
                    }

                    teleportsEl.innerText = baseTeleports.toLocaleString();
                    document.getElementById('live-tps').innerText = baseTPS.toFixed(1);
                    document.getElementById('live-crashed').innerText = `${baseCrashedServers} / 14`;

                    if (Math.random() > 0.9) {
                        document.getElementById('terminal-log-chawe').innerText = chaweLogMessages[Math.floor(Math.random() * chaweLogMessages.length)];
                    }
                } else if (currentStory === 'classic') {
                    const tempEl = document.getElementById('live-temp');
                    if (!tempEl) return;

                    baseTemp += (Math.random() * 0.8) - 0.2;
                    baseBosses += Math.floor(Math.random() * 900) + 100;
                    if (Math.random() > 0.97 && baseRacks < 22) baseRacks += 1;

                    tempEl.innerText = baseTemp.toFixed(1) + '°C';
                    document.getElementById('live-bosses').innerText = baseBosses.toLocaleString();
                    document.getElementById('live-racks').innerText = `${baseRacks} / 22`;

                    if (Math.random() > 0.9) {
                        document.getElementById('terminal-log-classic').innerText = classicLogMessages[Math.floor(Math.random() * classicLogMessages.length)];
                    }
                } else if (currentStory === 'maksim') {
                    const replaysEl = document.getElementById('live-replays');
                    if (!replaysEl) return;

                    baseClipReplays += Math.floor(Math.random() * 300) + 40;
                    baseFallHeight += (Math.random() * 0.4) - 0.2; // re-measured by chat every few seconds
                    if (baseFallHeight < 8) baseFallHeight = 8;
                    if (baseFallHeight > 15) baseFallHeight = 15;

                    replaysEl.innerText = baseClipReplays.toLocaleString();
                    document.getElementById('live-fallheight').innerText = baseFallHeight.toFixed(1) + ' ft';
                    // Eggs Successfully Stolen stays locked at 0 — the run failed.

                    if (Math.random() > 0.9) {
                        document.getElementById('terminal-log-maksim').innerText = maksimLogMessages[Math.floor(Math.random() * maksimLogMessages.length)];
                    }
                }
            }, 100); // Super fast 100ms updates to look "relentless"
        }

        // 6. Newsletter Signup
        //
        // Handled entirely by the embedded beehiiv iframe in the page HTML —
        // no JS needed here. beehiiv hosts the form, validates the email, and
        // adds the subscriber to your publication's audience directly.

        // 7a. Page bootstrap — called once at the bottom of each page's HTML.
        // categoryFilter: a cardCategory string (e.g. "AI & Frontier") to show only
        // that section on this page's home grid, or null/undefined for every story.
        function initPage(categoryFilter) {
            // Sync the theme toggle icon with whatever theme is already active.
            if (document.documentElement.classList.contains('dark')) {
                document.getElementById('theme-icon').classList.replace('fa-moon', 'fa-sun');
            }

            renderHomeCards(categoryFilter);
            startLiveTracker(); // no-ops until an article is actually open
        }

        // 8. Giscus Comments (GitHub Discussions-backed, works across devices)
        //
        // SETUP REQUIRED before this works:
        //   1. Push this site to a PUBLIC GitHub repo (or a private one on GitHub Pro/Team/Enterprise).
        //   2. In that repo: Settings -> General -> Features -> enable "Discussions".
        //   3. Install the giscus app on the repo: https://github.com/apps/giscus
        //   4. Go to https://giscus.app, enter your repo, and it will generate the exact
        //      data-repo / data-repo-id / data-category / data-category-id values for you.
        //   5. Paste those four values into GISCUS_CONFIG below, replacing the placeholders.
        //
        // Each article gets its OWN separate comment thread (via data-term), created
        // automatically the first time someone comments on that article.
        const GISCUS_CONFIG = {
            repo: 'nobu-q7e/thesiliconewire',
            repoId: 'R_kgDOUgDbFQ',
            category: 'General',
            categoryId: 'DIC_kwDOUgDbFc4DF4QA',
            mapping: 'specific'                                 // ties each article to its own thread
        };

        function currentGiscusTheme() {
            return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        }

        // (Re)mounts the giscus widget for whichever article is currently open,
        // giving each article its own discussion thread via data-term.
        function loadGiscus(articleId) {
            const container = document.getElementById('giscus-comments');
            if (!container) return;
            container.innerHTML = '';

            if (GISCUS_CONFIG.repo === 'YOUR_GITHUB_USERNAME/YOUR_REPO_NAME') {
                // Config hasn't been filled in yet — show a friendly placeholder instead of a broken widget.
                container.innerHTML = `
                    <div class="bg-gray-50 dark:bg-gray-800/40 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-sm text-gray-500 dark:text-gray-400 font-sans">
                        <i class="fa-solid fa-comments mr-2"></i>
                        Comments aren't connected yet. Fill in <code>GISCUS_CONFIG</code> at the top of the "Giscus Comments" section
                        of the script (get your values from <a href="https://giscus.app" target="_blank" rel="noopener" class="underline hover:text-brand-red">giscus.app</a>) to turn this on.
                    </div>
                `;
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://giscus.app/client.js';
            script.setAttribute('data-repo', GISCUS_CONFIG.repo);
            script.setAttribute('data-repo-id', GISCUS_CONFIG.repoId);
            script.setAttribute('data-category', GISCUS_CONFIG.category);
            script.setAttribute('data-category-id', GISCUS_CONFIG.categoryId);
            script.setAttribute('data-mapping', GISCUS_CONFIG.mapping);
            script.setAttribute('data-term', articleId); // separate thread per article
            script.setAttribute('data-strict', '0');
            script.setAttribute('data-reactions-enabled', '1');
            script.setAttribute('data-emit-metadata', '0');
            script.setAttribute('data-input-position', 'bottom');
            script.setAttribute('data-theme', currentGiscusTheme());
            script.setAttribute('data-lang', 'en');
            script.setAttribute('crossorigin', 'anonymous');
            script.async = true;
            container.appendChild(script);
        }

        // Tells an already-mounted giscus iframe to switch theme (used by toggleTheme()).
        function syncGiscusTheme() {
            const iframe = document.querySelector('iframe.giscus-frame');
            if (!iframe) return;
            iframe.contentWindow.postMessage(
                { giscus: { setConfig: { theme: currentGiscusTheme() } } },
                'https://giscus.app'
            );
        }
    