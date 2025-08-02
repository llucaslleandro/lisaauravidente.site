
        // Popup toggle (abrir o popup)
		document.querySelectorAll('a[href="#popup"]').forEach(link => {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				document.getElementById('popup').style.display = 'flex';
				document.body.style.overflow = 'hidden'; // Impede rolagem da página de fundo
			});
		});

		// Fechar o popup
		function closePopup() {
			document.getElementById('popup').style.display = 'none';
			document.body.style.overflow = 'auto'; // Restaura a rolagem
		}

		// Fechar o popup ao clicar fora do conteúdo
		document.getElementById('popup').addEventListener('click', (e) => {
			if (e.target === document.getElementById('popup')) {
				closePopup();
			}
		});

        // Extract URL parameters
        function getParams() {
            const url = new URL(window.location.href);
            const utmSource = url.searchParams.get("utm_source") || "";
            const utmMedium = url.searchParams.get("utm_medium") || "";
            const utmCampaign = url.searchParams.get("utm_campaign") || "";
            const utmTerm = url.searchParams.get("utm_term") || "";
            const utmContent = url.searchParams.get("utm_content") || "";
            const fbclid = url.searchParams.get("fbclid") || "";
            let paramsString = "";
            if (url.search) {
                paramsString = `&sck=${utmSource}|${utmMedium}|${utmCampaign}|${utmTerm}|${utmContent}`;
            }
            return paramsString;
        }

        // Get cookie
        function getCookie(name) {
            const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            return match ? match[2] : null;
        }

        // Update links with UTM parameters
        function updateLinks() {
            const urlParams = new URLSearchParams(window.location.search);
            const leadUserIndex = getCookie("LeadUserIndex") || sessionStorage.getItem("LeadUserIndex");
            const prefixes = ["https://pagamento.lisaaura.com", "https://payment.ticto.app", "revelacao-da-alma-gemea-precheckout", "esp-pre", "aoracaodivina", "rag-pc", "lisa-aura-sensitiv.mycartpanda.com"];

            if (leadUserIndex) {
                if (!urlParams.has('utm_term')) {
                    urlParams.append("utm_term", leadUserIndex);
                }
                document.querySelectorAll("a").forEach(link => {
                    prefixes.forEach(prefix => {
                        if (link.href.includes(prefix) && !link.href.startsWith('https://lisaaura.com')) {
                            if (urlParams.has('ln')) {
                                const lnValue = urlParams.get('ln');
                                urlParams.delete('ln');
                                urlParams.append("name", lnValue);
                            }
                            const separator = link.href.includes("?") ? "&" : "?";
                            link.href += separator + urlParams.toString() + getParams();
                        }
                    });
                });
            } else {
                setTimeout(updateLinks, 100);
            }
        }

        window.addEventListener('load', updateLinks);
