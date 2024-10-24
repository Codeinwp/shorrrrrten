# Shorrrrrten
Shorrrrrten is a React-based frontend for YOURLS, using the YOURLS API to interact with a YOURLS instance. This project provides a simple and user-friendly interface to manage your YOURLS links.

## Getting Started

### Installation
1. Clone the repository to your local machine.
2. Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
3. Replace the following variables in the `.env` file with your own values:
- `VITE_YOURLS_API_URL`: The URL of your YOURLS API endpoint.
- `VITE_YOURLS_SECRET`: Your YOURLS secret key for API access.
- `VITE_GOD_MODE`: Controls edit/delete permissions for links (optional)
  - If undefined or set to 'true': Edit/delete enabled by default
  - If set to 'false': Edit/delete permanently disabled
  - If set to any other string: Functions as a password that users must enter via console command to enable edit/delete permissions

### God Mode
The God Mode feature controls whether users can edit or delete existing links. It can be configured in three ways:

1. **Always Enabled (Default)**
   - Don't set `VITE_GOD_MODE`, or set it to 'true'
   - Users will always have edit/delete permissions

2. **Always Disabled**
   - Set `VITE_GOD_MODE=false`
   - Users will never have edit/delete permissions

3. **Password Protected**
   - Set `VITE_GOD_MODE` to any string (e.g., `VITE_GOD_MODE=mysecretpassword`)
   - Users must enable God Mode via browser console:
     ```javascript
     // Enable God Mode
     godMode.enter('mysecretpassword')

     // Disable God Mode
     godMode.exit()
     ```

### Prerequisites
To make the frontend work with your YOURLS instance, you will need to install the following YOURLS plugins:
- [yourls-access-control-allow-origin](https://github.com/TEODE/yourls-access-control-allow-origin)
- [yourls-api-delete](https://github.com/claytondaley/yourls-api-delete)
- [yourls-api-edit-url](https://github.com/timcrockford/yourls-api-edit-url)
- [yourls-api-list-extended](https://github.com/Codeinwp/yourls-api-list-extended)

These plugins extend the YOURLS API to allow for full CRUD operations from the frontend.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.