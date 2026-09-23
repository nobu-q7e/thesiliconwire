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
                try { localStorage.setItem('silicon-wire-theme', 'light'); } catch (e) {}
                showToast("Switched to Light Mode");
            } else {
                html.classList.add('dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                try { localStorage.setItem('silicon-wire-theme', 'dark'); } catch (e) {}
                showToast("Switched to Dark Mode");
            }
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
                toggleBookmarkForCurrentArticle();
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
            syncBookmarkIcon();
        }

        function openArticle(id) {
            if (!articles[id]) return;
            currentStory = id;
            renderStory(articles[id]);
            document.getElementById('home-view').classList.add('hidden');
            document.getElementById('article-view').classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast(`Now reading: ${articles[id].cardCategory}`, 'info');
            loadComments(id);
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
                }
            }, 100); // Super fast 100ms updates to look "relentless"
        }

        // 6. Newsletter Signup
        //
        // Handled entirely by the embedded beehiiv iframe in the page HTML —
        // no JS needed here. beehiiv hosts the form, validates the email, and
        // adds the subscriber to your publication's audience directly.

        // 6a. Dynamic story loading — EVERY story lives as one .json file in
        // the /stories/ folder of the GitHub repo. There is no other place
        // stories are defined; articles-data.js just declares the two empty
        // variables below fills. Add a story = add one file. Nothing else
        // needs to change: no HTML edits, no touching order by hand.
        //
        // How it works: since this site is hosted from a public GitHub repo,
        // the page asks GitHub's own API "what files are in /stories/?" on
        // load, fetches each one, and adds it to the article registry.
        // Stories are sorted newest-first by each file's `publishedDate`
        // field (YYYY-MM-DD) — NOT by filename or upload order.
        //
        // File format: see stories/edward-ai.json for a full example.
        // Required field for ordering: "publishedDate": "2026-09-22".
        // Everything else is the same fields site.js's renderStory() /
        // renderHomeCards() expect (title, bodyHTML, cardCategory, etc.).
        const GITHUB_CONFIG = {
            owner: 'nobu-q7e',
            repo: 'thesiliconwire',
            storiesPath: 'stories'
        };

        async function loadDynamicStories() {
            const { owner, repo, storiesPath } = GITHUB_CONFIG;
            try {
                const listRes = await fetch(
                    `https://api.github.com/repos/${owner}/${repo}/contents/${storiesPath}`
                );
                if (!listRes.ok) return; // folder doesn't exist yet, or rate-limited — fine, just skip

                const files = await listRes.json();
                const jsonFiles = files.filter(f => f.type === 'file' && f.name.endsWith('.json'));

                // Fetch every story file in parallel.
                const loaded = await Promise.all(
                    jsonFiles.map(async file => {
                        try {
                            const res = await fetch(file.download_url);
                            if (!res.ok) return null;
                            const data = await res.json();
                            const id = file.name.replace(/\.json$/, '');
                            return { id, data };
                        } catch (e) {
                            console.warn(`Silicon Wire: couldn't load story "${file.name}"`, e);
                            return null;
                        }
                    })
                );

                // Sort newest-first by publishedDate. Anything missing the
                // field sinks to the bottom rather than breaking the sort.
                const valid = loaded.filter(Boolean);
                valid.sort((a, b) => {
                    const dateA = a.data.publishedDate || '0000-00-00';
                    const dateB = b.data.publishedDate || '0000-00-00';
                    return dateB.localeCompare(dateA);
                });

                articleOrder.length = 0; // articleOrder is declared `const` — clear in place, don't reassign
                for (const entry of valid) {
                    articles[entry.id] = entry.data;
                    articleOrder.push(entry.id);
                }
            } catch (e) {
                // Offline, GitHub down, rate-limited, whatever — without this,
                // the home grid will just come up empty rather than broken.
                console.warn('Silicon Wire: dynamic story loading failed', e);
            }
        }

        // 7a. Accounts & Bookmarks
        //
        // Talks to a small Cloudflare Worker that holds account passwords
        // and bookmark lists (a static site can't safely do this itself —
        // see /worker/README.md for what it does and how to deploy it).
        //
        // SETUP REQUIRED: after you deploy the Worker, paste its URL below.
        const ACCOUNTS_CONFIG = {
            workerUrl: 'https://silicon-wire-accounts.nobu-q7e.workers.dev'
        };

        let currentBookmarks = []; // cached list of this session's bookmarked article ids

        function getSession() {
            try {
                const raw = localStorage.getItem('silicon-wire-session');
                return raw ? JSON.parse(raw) : null;
            } catch (e) {
                return null;
            }
        }

        function setSession(token, username) {
            localStorage.setItem('silicon-wire-session', JSON.stringify({ token, username }));
        }

        function clearSession() {
            localStorage.removeItem('silicon-wire-session');
        }

        function accountsConfigured() {
            if (!ACCOUNTS_CONFIG.workerUrl) {
                showToast("Accounts aren't set up yet — see worker/README.md.", "info");
                return false;
            }
            return true;
        }

        async function signup(username, password) {
            if (!accountsConfigured()) return false;
            try {
                const res = await fetch(`${ACCOUNTS_CONFIG.workerUrl}/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const data = await res.json();
                if (!res.ok) {
                    showToast(data.error || "Couldn't create that account.", "info");
                    return false;
                }
                setSession(data.token, data.username);
                showToast(`Welcome, ${data.username}!`);
                return true;
            } catch (e) {
                showToast("Couldn't reach the accounts service.", "info");
                return false;
            }
        }

        async function login(username, password) {
            if (!accountsConfigured()) return false;
            try {
                const res = await fetch(`${ACCOUNTS_CONFIG.workerUrl}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const data = await res.json();
                if (!res.ok) {
                    showToast(data.error || "Couldn't log in.", "info");
                    return false;
                }
                setSession(data.token, data.username);
                showToast(`Welcome back, ${data.username}!`);
                return true;
            } catch (e) {
                showToast("Couldn't reach the accounts service.", "info");
                return false;
            }
        }

        async function logout() {
            const session = getSession();
            if (session && ACCOUNTS_CONFIG.workerUrl) {
                fetch(`${ACCOUNTS_CONFIG.workerUrl}/logout`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: session.token })
                }).catch(() => {}); // best-effort, don't block on it
            }
            clearSession();
            currentBookmarks = [];
            syncAccountIcon();
            syncBookmarkIcon();
            showToast("Logged out.");
        }

        // Fetches this session's bookmark list from the Worker and updates
        // the header's account icon. Safe to call on every page load.
        async function loadBookmarks() {
            const session = getSession();
            syncAccountIcon();
            if (!session || !ACCOUNTS_CONFIG.workerUrl) return;

            try {
                const res = await fetch(
                    `${ACCOUNTS_CONFIG.workerUrl}/bookmarks?token=${encodeURIComponent(session.token)}`
                );
                if (!res.ok) return; // token expired or invalid — just show as logged out
                const data = await res.json();
                currentBookmarks = data.bookmarks || [];
            } catch (e) {
                console.warn('Silicon Wire: could not load bookmarks', e);
            }
        }

        async function toggleBookmarkForCurrentArticle() {
            const session = getSession();
            if (!session) {
                showToast("Log in to save articles — see the account icon up top.", "info");
                return;
            }
            if (!currentStory) return;
            if (!accountsConfigured()) return;

            const isBookmarked = currentBookmarks.includes(currentStory);
            try {
                const res = await fetch(`${ACCOUNTS_CONFIG.workerUrl}/bookmark`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        token: session.token,
                        articleId: currentStory,
                        action: isBookmarked ? 'remove' : 'add'
                    })
                });
                const data = await res.json();
                if (!res.ok) {
                    showToast(data.error || "Couldn't update your bookmarks.", "info");
                    return;
                }
                currentBookmarks = data.bookmarks;
                syncBookmarkIcon();
                showToast(isBookmarked ? "Removed from your reading list." : "Saved to your reading list.");
            } catch (e) {
                showToast("Couldn't reach the accounts service.", "info");
            }
        }

        // Fills/outlines the bookmark icon on the currently open article,
        // if the article-view toolbar exists on this page.
        function syncBookmarkIcon() {
            const icon = document.getElementById('bookmark-icon');
            if (!icon || !currentStory) return;
            const saved = currentBookmarks.includes(currentStory);
            icon.classList.toggle('fa-solid', saved);
            icon.classList.toggle('fa-regular', !saved);
            icon.classList.toggle('text-brand-red', saved);
        }

        // Fills the header's account icon when logged in, if it exists on this page.
        function syncAccountIcon() {
            const icon = document.getElementById('account-icon');
            if (!icon) return;
            const session = getSession();
            icon.classList.toggle('fa-solid', !!session);
            icon.classList.toggle('fa-regular', !session);
            icon.classList.toggle('text-brand-red', !!session);
        }

        // 7c. Comments
        //
        // Reads are public (anyone can view), posting requires being logged
        // in. Comment text is always rendered via escapeHtml() below — never
        // trusted as HTML — so one reader's comment can't run script in
        // another reader's browser.
        function escapeHtml(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }

        function formatCommentDate(isoString) {
            try {
                return new Date(isoString).toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                });
            } catch (e) {
                return '';
            }
        }

        function renderComments(list) {
            const container = document.getElementById('comments-list');
            if (!container) return;

            if (!list || list.length === 0) {
                container.innerHTML = `
                    <p class="text-sm text-gray-400 dark:text-gray-600 font-sans">No comments yet. Be the first.</p>
                `;
                return;
            }

            container.innerHTML = list.slice().reverse().map(c => `
                <div class="flex gap-3">
                    <div class="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300 flex-shrink-0">
                        ${escapeHtml((c.username || '?').slice(0, 2).toUpperCase())}
                    </div>
                    <div class="min-w-0">
                        <div class="flex items-baseline gap-2 flex-wrap">
                            <span class="font-bold text-sm text-gray-900 dark:text-white">${escapeHtml(c.username)}</span>
                            <span class="text-xs text-gray-400 dark:text-gray-600">${escapeHtml(formatCommentDate(c.postedAt))}</span>
                        </div>
                        <p class="text-sm text-gray-700 dark:text-gray-300 font-sans mt-1 whitespace-pre-wrap break-words">${escapeHtml(c.text)}</p>
                    </div>
                </div>
            `).join('');
        }

        async function loadComments(articleId) {
            const container = document.getElementById('comments-list');
            const form = document.getElementById('comment-form');
            const loginPrompt = document.getElementById('comment-login-prompt');
            if (!container) return; // this page has no comment section

            const session = getSession();
            if (form) form.classList.toggle('hidden', !session);
            if (loginPrompt) loginPrompt.classList.toggle('hidden', !!session);

            if (!ACCOUNTS_CONFIG.workerUrl) {
                container.innerHTML = `
                    <p class="text-sm text-gray-400 dark:text-gray-600 font-sans">Comments aren't set up yet — see worker/README.md.</p>
                `;
                return;
            }

            try {
                const res = await fetch(
                    `${ACCOUNTS_CONFIG.workerUrl}/comments?articleId=${encodeURIComponent(articleId)}`
                );
                if (!res.ok) return;
                const data = await res.json();
                renderComments(data.comments);
            } catch (e) {
                console.warn('Silicon Wire: could not load comments', e);
            }
        }

        async function postComment(text) {
            const session = getSession();
            if (!session) {
                showToast("Log in to comment.", "info");
                return;
            }
            if (!currentStory) return;
            if (!accountsConfigured()) return;

            try {
                const res = await fetch(`${ACCOUNTS_CONFIG.workerUrl}/comment`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: session.token, articleId: currentStory, text })
                });
                const data = await res.json();
                if (!res.ok) {
                    showToast(data.error || "Couldn't post that comment.", "info");
                    return;
                }
                renderComments(data.comments);
                const textarea = document.getElementById('comment-text');
                if (textarea) textarea.value = '';
                showToast("Comment posted.");
            } catch (e) {
                showToast("Couldn't reach the accounts service.", "info");
            }
        }

        // 7b. Page bootstrap — called once at the bottom of each page's HTML.
        // categoryFilter: a cardCategory string (e.g. "AI & Frontier") to show only
        // that section on this page's home grid, or null/undefined for every story.
        async function initPage(categoryFilter) {
            // Sync the theme toggle icon with whatever theme is already active.
            if (document.documentElement.classList.contains('dark')) {
                document.getElementById('theme-icon').classList.replace('fa-moon', 'fa-sun');
            }

            const commentForm = document.getElementById('comment-form');
            if (commentForm) {
                commentForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const text = document.getElementById('comment-text').value.trim();
                    if (text) postComment(text);
                });
            }

            await loadBookmarks();
            await loadDynamicStories();
            renderHomeCards(categoryFilter);
            startLiveTracker(); // no-ops until an article is actually open

            // If we got here via a "open this article" link from account.html's
            // reading list, open it now that articles are loaded.
            const pendingArticle = sessionStorage.getItem('open-on-load');
            if (pendingArticle) {
                sessionStorage.removeItem('open-on-load');
                if (articles[pendingArticle]) openArticle(pendingArticle);
            }
        }
