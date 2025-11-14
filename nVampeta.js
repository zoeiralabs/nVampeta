//nVampeta - Modern Version (No jQuery)
(function () {
    'use strict';

    const nVampeta = {
        nVampetaBackgrounds: [
            chrome.runtime.getURL('background/bg1.png')
        ],

        nVampetaImgs: [
            'https://i.imgur.com/meT1G7T.jpg',
            'https://i.imgur.com/scpspdR.jpg',
            'https://i.imgur.com/097JazL.jpg',
            'https://i.imgur.com/8CzMjuC.jpg',
            'https://i.imgur.com/wSDz4VJ.jpg',
            'https://i.imgur.com/B8tOwat.jpg',
            'https://i.imgur.com/TVmRwJ4.jpg',
            'https://i.imgur.com/CM1nPI8.jpg',
            'https://i.imgur.com/xhcfSst.jpg',
            'https://i.imgur.com/rangHmZ.jpg',
            'https://i.imgur.com/edVhcjS.jpg',
            'https://i.imgur.com/WdPhUqm.jpg',
            'https://i.imgur.com/n1BBZlf.jpg',
            'https://i.imgur.com/xIEoPac.jpg',
            'https://i.imgur.com/yy3DwnX.gif',
            'https://i.imgur.com/hd0BUJm.jpg',
            'https://i.imgur.com/HE4dSil.jpg',
            'https://i.imgur.com/A3JJUut.jpg',
            'https://i.imgur.com/i4XKBvD.jpg',
            'https://i.imgur.com/XveMAVe.jpg',
            'https://i.imgur.com/epuUjge.jpg',
            'https://i.imgur.com/IT1VLti.jpg',
            'https://i.imgur.com/l412AZq.jpg',
            'https://i.imgur.com/sPdWGaK.jpg',
            'https://i.imgur.com/PQ3bg1q.jpg',
            'https://i.imgur.com/DeQ0qo3.jpg',
            'https://i.imgur.com/wFi3HXs.jpg',
            'https://i.imgur.com/PCm1v57.jpg',
            'https://i.imgur.com/Oxs2AHZ.jpg',
            'https://i.imgur.com/SKKwYtQ.jpg',
            'https://i.imgur.com/rfSvENU.jpg',
            'https://i.imgur.com/qguMH00.jpg',
            'https://i.imgur.com/4Jh46kV.jpg'
        ],

        handleImages: function (lstImgs, time) {
            const images = document.querySelectorAll('img:not([data-vampeta-processed])');
            const pictures = document.querySelectorAll('picture:not([data-vampeta-processed])');
            
            // Handle regular img elements
            images.forEach((img) => {
                // Skip if image is a data URL or already processed
                if (img.src.startsWith('data:') || lstImgs.includes(img.src) || 
                    (img.srcset && lstImgs.includes(img.srcset)) ||
                    (img.getAttribute('data-src') && lstImgs.includes(img.getAttribute('data-src')))) {
                    return;
                }

                // Mark as processed to avoid reprocessing
                img.setAttribute('data-vampeta-processed', 'true');

                const replaceImage = () => {
                    const rect = img.getBoundingClientRect();
                    const originalWidth = img.offsetWidth || img.naturalWidth || rect.width;
                    const originalHeight = img.offsetHeight || img.naturalHeight || rect.height;

                    if (originalWidth > 10 && originalHeight > 10) { // Only replace reasonably sized images
                        // Preserve original dimensions
                        img.style.width = originalWidth + 'px';
                        img.style.height = originalHeight + 'px';
                        img.style.objectFit = 'cover';
                        
                        // Replace with random Vampeta image
                        const randomIndex = Math.floor(Math.random() * lstImgs.length);
                        const vampetaImage = lstImgs[randomIndex];
                        
                        img.src = vampetaImage;
                        img.alt = 'Vampeta';
                        
                        // Also replace srcset if it exists (for responsive/lazy loading images)
                        if (img.srcset) {
                            img.srcset = vampetaImage;
                        }
                        
                        // Replace data-src and data-srcset for lazy loading
                        if (img.getAttribute('data-src')) {
                            img.setAttribute('data-src', vampetaImage);
                        }
                        if (img.getAttribute('data-srcset')) {
                            img.setAttribute('data-srcset', vampetaImage);
                        }
                        
                        // Add a subtle fade effect
                        img.style.transition = 'opacity 0.3s ease-in-out';
                        img.style.opacity = '0';
                        setTimeout(() => {
                            img.style.opacity = '1';
                        }, 50);
                    }
                };

                // If image is already loaded
                if (img.complete && img.naturalWidth > 0) {
                    replaceImage();
                } else {
                    // Wait for image to load
                    const handleLoad = () => {
                        replaceImage();
                        img.removeEventListener('load', handleLoad);
                        img.removeEventListener('error', handleLoad);
                    };
                    
                    img.addEventListener('load', handleLoad);
                    img.addEventListener('error', handleLoad);
                }
            });

            // Handle picture elements and their source elements
            pictures.forEach((picture) => {
                picture.setAttribute('data-vampeta-processed', 'true');
                
                const sources = picture.querySelectorAll('source');
                const img = picture.querySelector('img');
                
                // Replace source elements' srcset
                sources.forEach((source) => {
                    if (source.srcset && !source.srcset.startsWith('data:')) {
                        const randomIndex = Math.floor(Math.random() * lstImgs.length);
                        source.srcset = lstImgs[randomIndex];
                    }
                });
                
                // Also handle the img element within picture if it exists
                if (img && !img.getAttribute('data-vampeta-processed')) {
                    img.setAttribute('data-vampeta-processed', 'true');
                    
                    const replaceImage = () => {
                        const rect = img.getBoundingClientRect();
                        const originalWidth = img.offsetWidth || img.naturalWidth || rect.width;
                        const originalHeight = img.offsetHeight || img.naturalHeight || rect.height;

                        if (originalWidth > 10 && originalHeight > 10) {
                            img.style.width = originalWidth + 'px';
                            img.style.height = originalHeight + 'px';
                            img.style.objectFit = 'cover';
                            
                            const randomIndex = Math.floor(Math.random() * lstImgs.length);
                            const vampetaImage = lstImgs[randomIndex];
                            
                            img.src = vampetaImage;
                            img.alt = 'Vampeta';
                            
                            // Also replace srcset if it exists (for responsive/lazy loading images)
                            if (img.srcset) {
                                img.srcset = vampetaImage;
                            }
                            
                            // Replace data-src and data-srcset for lazy loading
                            if (img.getAttribute('data-src')) {
                                img.setAttribute('data-src', vampetaImage);
                            }
                            if (img.getAttribute('data-srcset')) {
                                img.setAttribute('data-srcset', vampetaImage);
                            }
                            
                            img.style.transition = 'opacity 0.3s ease-in-out';
                            img.style.opacity = '0';
                            setTimeout(() => {
                                img.style.opacity = '1';
                            }, 50);
                        }
                    };

                    if (img.complete && img.naturalWidth > 0) {
                        replaceImage();
                    } else {
                        const handleLoad = () => {
                            replaceImage();
                            img.removeEventListener('load', handleLoad);
                            img.removeEventListener('error', handleLoad);
                        };
                        
                        img.addEventListener('load', handleLoad);
                        img.addEventListener('error', handleLoad);
                    }
                }
            });

            // Handle dynamically added images
            this.observeNewImages(lstImgs);

            // Schedule next replacement for new images
            if (time > 0) {
                setTimeout(() => {
                    this.handleImages(lstImgs, time);
                }, time);
            }
        },

        observeNewImages: function(lstImgs) {
            if (this.imageObserver) return; // Observer already exists

            this.imageObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Check if the added node is an image
                            if (node.tagName === 'IMG') {
                                this.processNewImage(node, lstImgs);
                            }
                            // Check if the added node is a picture element
                            if (node.tagName === 'PICTURE') {
                                this.processNewPicture(node, lstImgs);
                            }
                            // Check for images and pictures within added nodes
                            const images = node.querySelectorAll && node.querySelectorAll('img');
                            if (images) {
                                images.forEach(img => this.processNewImage(img, lstImgs));
                            }
                            const pictures = node.querySelectorAll && node.querySelectorAll('picture');
                            if (pictures) {
                                pictures.forEach(picture => this.processNewPicture(picture, lstImgs));
                            }
                        }
                    });
                });
            });

            this.imageObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        },

        processNewImage: function(img, lstImgs) {
            if (img.getAttribute('data-vampeta-processed') || img.src.startsWith('data:') || 
                lstImgs.includes(img.src) || (img.srcset && lstImgs.includes(img.srcset)) ||
                (img.getAttribute('data-src') && lstImgs.includes(img.getAttribute('data-src')))) {
                return;
            }

            img.setAttribute('data-vampeta-processed', 'true');
            
            const replaceWhenReady = () => {
                const rect = img.getBoundingClientRect();
                const width = img.offsetWidth || img.naturalWidth || rect.width;
                const height = img.offsetHeight || img.naturalHeight || rect.height;

                if (width > 10 && height > 10) {
                    img.style.width = width + 'px';
                    img.style.height = height + 'px';
                    img.style.objectFit = 'cover';
                    
                    const randomIndex = Math.floor(Math.random() * lstImgs.length);
                    const vampetaImage = lstImgs[randomIndex];
                    
                    img.src = vampetaImage;
                    img.alt = 'Vampeta';
                    
                    // Also replace srcset if it exists (for responsive/lazy loading images)
                    if (img.srcset) {
                        img.srcset = vampetaImage;
                    }
                    
                    // Replace data-src and data-srcset for lazy loading
                    if (img.getAttribute('data-src')) {
                        img.setAttribute('data-src', vampetaImage);
                    }
                    if (img.getAttribute('data-srcset')) {
                        img.setAttribute('data-srcset', vampetaImage);
                    }
                }
            };

            if (img.complete) {
                replaceWhenReady();
            } else {
                img.addEventListener('load', replaceWhenReady, { once: true });
            }
        },

        processNewPicture: function(picture, lstImgs) {
            if (picture.getAttribute('data-vampeta-processed')) {
                return;
            }

            picture.setAttribute('data-vampeta-processed', 'true');
            
            const sources = picture.querySelectorAll('source');
            const img = picture.querySelector('img');
            
            // Replace source elements' srcset
            sources.forEach((source) => {
                if (source.srcset && !source.srcset.startsWith('data:')) {
                    const randomIndex = Math.floor(Math.random() * lstImgs.length);
                    source.srcset = lstImgs[randomIndex];
                }
            });
            
            // Also handle the img element within picture if it exists
            if (img && !img.getAttribute('data-vampeta-processed')) {
                this.processNewImage(img, lstImgs);
            }
        },

        handleLogo: function (bgImgs) {
            const selectors = [
                '[class*=logo]', '[class*=header]', '[id*=header]', '[id*=logo]',
                '[class*=logo] span', '[class*=header] span', '[id*=header] span', '[id*=logo] span',
                '[class*=logo] h1', '[class*=header] h1', '[id*=header] h1', '[id*=logo] h1',
                '[class*=logo] a', '[class*=header] a', '[id*=header] a', '[id*=logo] a'
            ];

            const elements = document.querySelectorAll(selectors.join(', '));
            
            elements.forEach((element) => {
                const backgroundImage = window.getComputedStyle(element).backgroundImage;
                
                if (backgroundImage && backgroundImage !== 'none' && !element.getAttribute('data-vampeta-logo-processed')) {
                    element.setAttribute('data-vampeta-logo-processed', 'true');
                    
                    const randomIndex = Math.floor(Math.random() * bgImgs.length);
                    element.style.backgroundImage = `url(${bgImgs[randomIndex]})`;
                    element.style.backgroundPosition = 'center';
                    element.style.backgroundRepeat = 'no-repeat';
                    element.style.backgroundSize = 'contain';
                }
            });
        },

        init: function() {
            // Start the image replacement
            this.handleImages(this.nVampetaImgs, 5000);
            this.handleLogo(this.nVampetaBackgrounds);
            
            // Handle logo replacement for dynamically added content
            setInterval(() => {
                this.handleLogo(this.nVampetaBackgrounds);
            }, 10000);
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => nVampeta.init());
    } else {
        nVampeta.init();
    }

})();
