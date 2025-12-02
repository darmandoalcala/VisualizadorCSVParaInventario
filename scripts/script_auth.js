const SUPABASE_URL = 'https://oovzygalahromrinjffl.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vdnp5Z2FsYWhyb21yaW5qZmZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MzQwMzgsImV4cCI6MjA3OTIxMDAzOH0.crTTU0mxDvGJ2n2_MrQ43BTSBseYRbh7P5Prh5T98Wg';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-button');
const loginSection = document.getElementById('login-section');
const mainMenu = document.getElementById('main-menu');
const div1 = document.getElementById('div1');
const div2 = document.getElementById('div2');
const div3 = document.getElementById('div3');
const div4 = document.getElementById('div4');
const div6 = document.getElementById('div6');
const div7 = document.getElementById('div7');
const div8 = document.getElementById('div8');

const authError = document.getElementById('auth-error');

function handleAuthStatus(session) {
    if (session) {
        // Usuario logueado
        loginSection.style.display = 'none';
        mainMenu.style.display = 'block';
        //div1.style.display = 'block';
        div2.style.display = 'block';
        div3.style.display = 'block';
        div4.style.display = 'block';
        div6.style.display = 'block';
        div7.style.display = 'block';
        div8.style.display = 'block';
        
    } else {
        // Usuario deslogueado
        loginSection.style.display = 'block';
        mainMenu.style.display = 'none';
        //div1.style.display = 'none';
        div2.style.display = 'none';
        div3.style.display = 'none';
        div4.style.display = 'none';
        div6.style.display = 'none';
        div7.style.display = 'none';
        div8.style.display = 'none';

    }
}

// INICIO DE SESIÓN
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        authError.textContent = '';
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {// Intenta iniciar sesión
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;
            
            // Si tiene EXITO
            handleAuthStatus(data.session);

        } catch (error) {
            console.error('Error de autenticación:', error.message);
            authError.textContent = 'Error: Credenciales inválidas. Verifica tu correo y contraseña.';
        }
    });
}

// CIERRE DE SESIÓN
if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            console.error('Error al cerrar sesión:', error.message);
        } else {
            // Vuelve a la vista de login
            handleAuthStatus(null);
        }
    });
}


// VERIFICAR SESIÓN AL CARGAR LA PAGINA
async function checkSession() {
    // Revisa si ya hay una sesión activa en el navegador
    const { data: { session } } = await supabaseClient.auth.getSession();
    handleAuthStatus(session);

    //Escuchar cambios de autenticación en tiempo real
    supabaseClient.auth.onAuthStateChange((event, session) => {
        handleAuthStatus(session);
    });
}

window.onload = checkSession;