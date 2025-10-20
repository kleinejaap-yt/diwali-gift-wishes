// API endpoint for saving images
const API_URL = 'https://www.surajrana.dev/happydiwali/api';

// Store user uploaded image
let userUploadedImage = null;

// Random Diwali Wishes Array
const diwaliWishes = [
    {
        text: "🪔 दीपों का त्यौहार आया है 🪔<br>खुशियों की बहार लाया है<br>माँ लक्ष्मी का आशीर्वाद मिले<br>हर दिन सुनहरा हो जाए<br><br>✨ शुभ दीपावली ✨",
        color: "#ff5722"
    },
    {
        text: "🎆 दीप जलाएं, रोशनी फैलाएं 🎆<br>खुशियों का जश्न मनाएं<br>सपने सभी पूरे हों<br>यही दुआ है आपके लिए<br><br>🪔 हैप्पी दिवाली 🪔",
        color: "#ff6f00"
    },
    {
        text: "✨ पटाखों की गूंज हो ✨<br>दीयों की रोशनी हो<br>मिठाई की मिठास हो<br>और आपके जीवन में खुशियाँ ही खुशियाँ हों<br><br>🎇 शुभ दीपावली 🎇",
        color: "#d84315"
    },
    {
        text: "🪔 आये आपके द्वार पर माँ लक्ष्मी 🪔<br>लाये साथ में ढेर सारी खुशियाँ<br>सफलता और समृद्धि का हो वास<br>यही शुभकामना है इस दिवाली<br><br>🎆 हैप्पी दिवाली 🎆",
        color: "#e65100"
    },
    {
        text: "🌟 चमके दीपक, मिटे अंधेरा 🌟<br>आये घर में सुख-समृद्धि का बसेरा<br>हो जीवन रोशनी से भरपूर<br>यही है दिवाली की शुभकामना<br><br>✨ शुभ दीपावली ✨",
        color: "#bf360c"
    },
    {
        text: "🎇 दिवाली का प्यारा त्यौहार 🎇<br>लाए जीवन में खुशियों का भंडार<br>मिले सफलता कदम-कदम पर<br>रहे हमेशा आप खुश और स्वस्थ<br><br>🪔 हैप्पी दिवाली 🪔",
        color: "#ff3d00"
    },
    {
        text: "🪔 रोशनी से भर जाए आपका घर 🪔<br>खुशियों से महके आपका आंगन<br>माँ लक्ष्मी करें कृपा अपार<br>यही प्रार्थना है इस दिवाली पर<br><br>🎆 शुभ दीपावली 🎆",
        color: "#f4511e"
    },
    {
        text: "✨ दीयों की रोशनी से 💫<br>रोशन हो जाए आपकी जिंदगी<br>मिठाइयों की मिठास घोले<br>और पटाखों की आवाज़ लाए खुशियाँ<br><br>🪔 हैप्पी दिवाली 🪔",
        color: "#dd2c00"
    },
    {
        text: "🎇 फूलों की खुशबू, रंगोली की रंगत 🎇<br>दीयों की रोशनी, मिठाइयों का स्वाद<br>सब कुछ हो आपके जीवन में<br>खुशियों भरी दिवाली की शुभकामनाएं<br><br>✨ शुभ दीपावली ✨",
        color: "#ff6f00"
    },
    {
        text: "🪔 आए आपके घर में सुख-समृद्धि 🪔<br>हर दिन हो नया उजाला<br>माँ लक्ष्मी का आशीर्वाद बना रहे<br>यही कामना है दिल से<br><br>🎆 हैप्पी दिवाली 🎆",
        color: "#ff5722"
    }
];

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('फोटो का साइज़ 5MB से कम होना चाहिए!');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            // Compress image before storing
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Set max dimensions - SMALLER for URL sharing
                let width = img.width;
                let height = img.height;
                const maxSize = 150; // Even smaller - 150px for tiny URLs
                
                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                
                // Convert to compressed JPEG with very low quality for tiny size
                userUploadedImage = canvas.toDataURL('image/jpeg', 0.4);
                
                console.log('Image compressed:', (userUploadedImage.length / 1024).toFixed(2) + 'KB');
                
                const preview = document.getElementById('uploadPreview');
                preview.innerHTML = `<img src="${userUploadedImage}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">`;
                document.getElementById('removeImageBtn').classList.remove('hidden');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Remove uploaded image
function removeImage() {
    userUploadedImage = null;
    document.getElementById('userImage').value = '';
    const preview = document.getElementById('uploadPreview');
    preview.innerHTML = `
        <span class="upload-icon">📷</span>
        <span class="upload-text">अपनी फोटो अपलोड करें (Optional)</span>
    `;
    document.getElementById('removeImageBtn').classList.add('hidden');
}

// Get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Encode image for URL (base64 safe)
function encodeImageForUrl(dataUrl) {
    try {
        // For URL sharing, we need to be careful with special chars
        // Standard encodeURIComponent works but creates very long URLs
        return encodeURIComponent(dataUrl);
    } catch (e) {
        console.error('Error encoding image');
        return '';
    }
}

// Decode image from URL
function decodeImageFromUrl(encoded) {
    try {
        // Try standard decoding first
        let decoded = decodeURIComponent(encoded);
        
        // Validate it's a proper data URL
        if (decoded && decoded.startsWith('data:image')) {
            return decoded;
        }
        
        // If that fails, try direct use (might already be decoded)
        if (encoded && encoded.startsWith('data:image')) {
            return encoded;
        }
        
        console.warn('Invalid image format in URL');
    } catch (e) {
        console.error('Error decoding image:', e);
    }
    return null;
}

// Generate random wish based on user name
function getRandomWishForUser(name) {
    // Create a simple hash from the name to ensure same user gets same wish
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = ((hash << 5) - hash) + name.charCodeAt(i);
        hash = hash & hash; // Convert to 32-bit integer
    }
    const index = Math.abs(hash) % diwaliWishes.length;
    return diwaliWishes[index];
}

// Create Lightning Effect - DISABLED
// function createLightning() {
//     const lightning = document.createElement('div');
//     lightning.style.position = 'fixed';
//     lightning.style.top = '0';
//     lightning.style.left = Math.random() * window.innerWidth + 'px';
//     lightning.style.width = '2px';
//     lightning.style.height = '100vh';
//     lightning.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), transparent)';
//     lightning.style.boxShadow = '0 0 20px #fff, 0 0 40px #fff, 0 0 60px #fff';
//     lightning.style.zIndex = '5';
//     lightning.style.opacity = '0';
//     lightning.style.transition = 'opacity 0.1s';
//     lightning.style.pointerEvents = 'none';
//     
//     document.body.appendChild(lightning);
//     
//     // Flash effect
//     setTimeout(() => {
//         lightning.style.opacity = '1';
//     }, 10);
//     
//     setTimeout(() => {
//         lightning.style.opacity = '0';
//     }, 150);
//     
//     setTimeout(() => {
//         lightning.style.opacity = '1';
//     }, 200);
//     
//     setTimeout(() => {
//         lightning.style.opacity = '0';
//         setTimeout(() => document.body.removeChild(lightning), 200);
//     }, 350);
// }

// Random lightning strikes - DISABLED
// setInterval(() => {
//     if (Math.random() > 0.7) { // 30% chance every 3 seconds
//         createLightning();
//     }
// }, 3000);

// Click to create fireworks
document.addEventListener('click', (e) => {
    // Create firework at click position
    createFirework(e.clientX, e.clientY);
    
    // Create extra particles for more dramatic effect
    setTimeout(() => {
        createFirework(e.clientX + 30, e.clientY - 20);
    }, 100);
    
    setTimeout(() => {
        createFirework(e.clientX - 30, e.clientY - 20);
    }, 150);
});

// Fireworks Animation
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.velocity.x *= 0.98;
        this.velocity.y *= 0.98;
        this.velocity.y += 0.1;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
    }
}

let particles = [];
const colors = ['#ff0080', '#ff8c00', '#40e0d0', '#9370db', '#ffd700', '#ff1744', '#00e676'];

function createFirework(x, y) {
    const particleCount = 50;
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function animateFireworks() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            particles.splice(index, 1);
        } else {
            particle.update();
            particle.draw();
        }
    });

    requestAnimationFrame(animateFireworks);
}

// Auto create fireworks
setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;
    createFirework(x, y);
}, 1000);

animateFireworks();

// Main Logic
window.addEventListener('DOMContentLoaded', async () => {
    const userName = getUrlParameter('name');
    const wishId = getUrlParameter('id'); // New: Server-stored wish ID
    const userImageParam = getUrlParameter('img'); // Legacy: Direct image in URL
    
    console.log('=== DIWALI WISH LOADING ===');
    console.log('Name:', userName);
    console.log('Wish ID:', wishId || 'none');
    console.log('Has direct image:', !!userImageParam);
    
    if (userName) {
        // Try to load from server first (new method)
        if (wishId) {
            try {
                console.log('📥 Loading from server...');
                const response = await fetch(API_URL + '/load/' + wishId);
                const data = await response.json();
                
                if (data.image) {
                    userUploadedImage = data.image;
                    console.log('✅ Image loaded from server');
                    console.log('   Size:', (data.image.length / 1024).toFixed(2) + 'KB');
                } else {
                    console.log('❌ No image in server response');
                }
            } catch (e) {
                console.error('❌ Server error:', e);
            }
        }
        
        // Fallback: Try direct image in URL (legacy)
        if (!userUploadedImage && userImageParam) {
            const decodedImage = decodeImageFromUrl(userImageParam);
            if (decodedImage) {
                userUploadedImage = decodedImage;
                console.log('✅ Image loaded from URL');
                console.log('   Size:', (decodedImage.length / 1024).toFixed(2) + 'KB');
            }
        }
        
        console.log('Final image available:', !!userUploadedImage);
        console.log('=== END LOADING ===');
        showGift(userName);
    }
});

async function createWish() {
    const input = document.getElementById('userName');
    const name = input.value.trim();
    
    if (!name) {
        alert('कृपया अपना नाम लिखें!');
        return;
    }
    
    let url = window.location.origin + window.location.pathname + '?name=' + encodeURIComponent(name);
    
    // Save image to server if uploaded
    if (userUploadedImage) {
        try {
            console.log('📤 Saving image to server...');
            const response = await fetch(API_URL + '/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    image: userUploadedImage
                })
            });
            
            const data = await response.json();
            if (data.success && data.id) {
                url += '&id=' + data.id;
                console.log('✅ Image saved with ID:', data.id);
            } else {
                console.warn('⚠️ Could not save image to server');
            }
        } catch (e) {
            console.error('❌ Server error:', e);
            console.log('⚠️ Falling back to URL encoding...');
        }
    }
    
    console.log('🔗 Share URL:', url);
    console.log('   Length:', url.length, 'chars');
    
    // Copy to clipboard
    copyToClipboard(url);
    
    // Show gift
    showGift(name);
}

function showGift(name) {
    const nameForm = document.getElementById('nameForm');
    const giftContainer = document.getElementById('giftContainer');
    const giftBox = document.getElementById('giftBox');
    
    // Hide form
    nameForm.classList.add('hidden');
    
    // Show gift
    giftContainer.classList.remove('hidden');
    
    // Add click event to open gift
    giftBox.addEventListener('click', () => {
        openGift(name);
    });
}

function openGift(name) {
    const giftBox = document.getElementById('giftBox');
    const giftContainer = document.getElementById('giftContainer');
    const boatAnimationContainer = document.getElementById('boatAnimationContainer');
    const wishContainer = document.getElementById('wishContainer');
    const displayName = document.getElementById('displayName');
    const wishText = document.querySelector('.hindi-wish');
    const userImageContainer = document.getElementById('userImageContainer');
    const displayUserImage = document.getElementById('displayUserImage');
    
    // Get random wish for this user
    const userWish = getRandomWishForUser(name);
    
    // Open gift animation
    giftBox.classList.add('opening');
    
    // Create massive fireworks
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.6;
            createFirework(x, y);
        }, i * 100);
    }
    
    // Show boat animation first
    setTimeout(() => {
        giftContainer.classList.add('hidden');
        boatAnimationContainer.classList.remove('hidden');
        
        // Show wish after boat animation (12 seconds - matching boat animation duration)
        setTimeout(() => {
            boatAnimationContainer.classList.add('hidden');
            wishContainer.classList.remove('hidden');
            displayName.textContent = name;
            displayName.style.color = userWish.color;
            wishText.innerHTML = userWish.text;
            
            // Show user image if uploaded
            if (userUploadedImage) {
                displayUserImage.src = userUploadedImage;
                userImageContainer.classList.remove('hidden');
            } else {
                userImageContainer.classList.add('hidden');
            }
            
            // Continue fireworks
            setInterval(() => {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height * 0.5;
                createFirework(x, y);
            }, 800);
        }, 12000);
    }, 1000);
}

async function shareWish() {
    const name = document.getElementById('displayName').textContent;
    let url = window.location.origin + window.location.pathname + '?name=' + encodeURIComponent(name);
    
    // Show loading
    console.log('📤 Preparing share...');
    
    // Save to server for short URL
    if (userUploadedImage) {
        try {
            const response = await fetch(API_URL + '/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    image: userUploadedImage
                })
            });
            
            const data = await response.json();
            if (data.success && data.id) {
                url += '&id=' + data.id;
                console.log('✅ Image saved for sharing:', data.id);
            }
        } catch (e) {
            console.error('❌ Could not save to server:', e);
        }
    }
    
    console.log('🔗 Share URL:', url);
    console.log('   Length:', url.length);
    
    // Create WhatsApp message with user's name
    const message = `"${name}" ने, आपको Gift 🎁 भेजा है!\n\nदिवाली की हार्दिक शुभकामनाएं! 🎆\n\n${url}`;
    
    // Better Mobile/Desktop detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isDesktop = !isMobile;
    
    // Check if on web.whatsapp.com already
    const isWhatsAppWeb = window.location.hostname.includes('web.whatsapp.com');
    
    let whatsappUrl;
    
    if (isMobile) {
        // Mobile: Try whatsapp:// first, fallback to api.whatsapp.com
        whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
        console.log('📱 Opening WhatsApp Mobile App...');
    } else {
        // Desktop: Use api.whatsapp.com (more reliable than web.whatsapp.com)
        whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        console.log('💻 Opening WhatsApp Web...');
    }
    
    console.log('   Device:', isMobile ? 'Mobile' : 'Desktop');
    console.log('   URL:', whatsappUrl);
    console.log('   Message length:', message.length);
    
    // Open WhatsApp in new window
    const newWindow = window.open(whatsappUrl, '_blank');
    
    // Fallback: If popup blocked or failed
    if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
        console.warn('⚠️ Popup blocked, trying direct navigation...');
        window.location.href = whatsappUrl;
    }
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('लिंक कॉपी हो गया! अब इसे WhatsApp, Facebook या किसी भी सोशल मीडिया पर शेयर करें! 🎉');
}

function createNew() {
    // Reset everything
    userUploadedImage = null;
    window.location.href = window.location.origin + window.location.pathname;
}

function createYourOwn() {
    // Reset to form so user can create their own wish
    const wishContainer = document.getElementById('wishContainer');
    const nameForm = document.getElementById('nameForm');
    
    // Reset image
    userUploadedImage = null;
    document.getElementById('userImage').value = '';
    const preview = document.getElementById('uploadPreview');
    preview.innerHTML = `
        <span class="upload-icon">📷</span>
        <span class="upload-text">अपनी फोटो अपलोड करें (Optional)</span>
    `;
    document.getElementById('removeImageBtn').classList.add('hidden');
    
    // Clear name input
    document.getElementById('userName').value = '';
    
    // Show form, hide wish
    wishContainer.classList.add('hidden');
    nameForm.classList.remove('hidden');
}
