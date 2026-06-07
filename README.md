# CamperRent - Landing Page de Lloguer de Campers (IA6)

Projecte full-stack basat en Next.js i PostgreSQL per a una empresa de lloguer de furgonetes camper de gamma alta. Implementa catàleg de vehicles, comentaris autenticats, formulari de contacte persistit a la base de dades i un panell d'administració (Backoffice) robust amb seguretat basada en rols.

Aquest projecte s'ha desenvolupat seguint el patró **MVC (Model-Vista-Controlador)** de disseny de programari.

## Stack Tecnològic

- **Core**: Next.js 16 (App Router) & TypeScript
- **Base de Dades**: PostgreSQL (allotjat a Supabase)
- **ORM**: Prisma 7 (amb adaptador `PrismaPg` i client PostgreSQL `pg`)
- **Autenticació**: Auth.js (NextAuth.js v5)
- **Estils**: Vanilla CSS premium (disseny fosc, glassmorphic, micro-animacions de hover)
- **Validació**: Zod (validació estricta del formulari de contacte, comentaris i comptes)
- **Seguretat**: bcryptjs per al xifratge de contrasenyes

---

## Estructura MVC a Next.js App Router

Per respectar el patró de disseny **MVC**:
- **Models**: Els esquemes a `prisma/schema.prisma` i el client singleton de base de dades a `src/db/prisma.ts`.
- **Vistes (Views)**: Components de React a `src/components/` (Navbar, Footer, CamperForm, etc.) i pàgines de renderització a `src/app/` (Home, Detall del model, Pàgines d'auth i de backoffice). Reben les dades i s'encarreguen exclusivament de renderitzar la interfície d'usuari (UI).
- **Controladors (Controllers)**: Accions del Servidor (Server Actions) a `src/actions/` (`auth.ts`, `register.ts`, `camper.ts`, `admin.ts`, `comment.ts`). Aquestes gestionen la lògica de negoci, realitzen validacions amb Zod i demanen actualitzacions o lectures als models per enviar dades actualitzades cap a les vistes.

---

## Passos per a l'Execució en Local

### 1. Clonar o descarregar el projecte
Assegura't de trobar-te a la carpeta arrel del directori de treball.

### 2. Instal·lar les dependències
Executa la següent comanda per instal·lar els paquets de Node.js:
```bash
npm install
```

### 3. Configurar les variables d'entorn
Crea o edita el fitxer `.env` a l'arrel del projecte amb la configuració de PostgreSQL i d'Auth.js:
```env
DATABASE_URL="postgresql://USUARI:CONTRASENYA@AWS_HOST:6543/postgres?schema=campers&pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://USUARI:CONTRASENYA@AWS_HOST:5432/postgres?schema=campers"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="un-secret-molt-segur-i-aleatori-per-a-la-landing-de-campers-ia6-2026"
AUTH_SECRET="un-secret-molt-segur-i-aleatori-per-a-la-landing-de-campers-ia6-2026"
PGOPTIONS="-c search_path=campers"
```
*(Nota: Per defecte s'ha enllaçat una base de dades PostgreSQL de prova allotjada en línia)*

### 4. Executar les migracions de Prisma
Crea les taules i els tipus a la base de dades:
```bash
npx prisma migrate dev --name init
```

### 5. Generar el Client de Prisma i executar el Seed
Genera el client per a Prisma 7 i carrega els usuaris de prova i el catàleg inicial de campers:
```bash
npx prisma generate
npx prisma db seed
```

### 6. Arrencar el servidor de desenvolupament
Inicia l'aplicació localment:
```bash
npm run dev
```
Obre [http://localhost:3000](http://localhost:3000) al teu navegador.

---

## Credencials d'Usuaris de Prova

Tots els usuaris tenen la mateixa contrasenya per facilitar la revisió: **`password123`**

| Email | Nom de l'Usuari | Rol | Permisos i Casos d'Ús |
| :--- | :--- | :--- | :--- |
| **`admin@campers.com`** | Admin Campers | **ADMIN** | Gestió de campers (CRUD), gestió de rols d'usuaris i llista de consultes de contacte. |
| **`editor@campers.com`** | Editor Campers | **EDITOR** | Gestió de campers (CRUD). Redirecció o accés denegat (403) a la gestió d'usuaris/consultes. |
| **`user@campers.com`** | Joan Turista | **USER** | Navegació del catàleg i publicació de comentaris. Bloqueig d'accés al Backoffice. |

*Qualsevol visitant no registrat pot:*
- Veure la pàgina d'inici i la flota de campers.
- Enviar formularis de consultes de contacte amb validacions de camps.
- Llegir els comentaris de les campers (sense poder publicar-ne de nous).

---

## Casos d'Ús Suportats (Proves Funcionals)

- **UC-01 & UC-02**: Catàleg de campers a la Home i pàgina de detall (`/models/[id]`) consultable per a visitants no identificats.
- **UC-03 & UC-04**: Formulari de contacte enviat correctament amb validacions en vermell si hi ha camps invàlids (amb Zod).
- **UC-05**: Registre de nous usuaris a `/auth/register` i inici de sessió a `/auth/login` (Auth.js).
- **UC-06 & UC-07**: Creació de comentaris restringida només a usuaris autenticats. Els visitants veuen un panell de bloqueig animat.
- **UC-08**: Rols de tipus `EDITOR` poden afegir, modificar i esborrar campers des de `/backoffice/models`.
- **UC-09**: Rol d'administració `ADMIN` pot llistar els usuaris a `/backoffice/users`, canviar els rols lliurement en calent i llegir consultes de contacte a `/backoffice/contacts`.
- **UC-10**: Control d'accés i seguretat a les rutes de Backoffice i Server Actions. Intents de bypass redirigeixen a l'inici amb un paràmetre d'error.
