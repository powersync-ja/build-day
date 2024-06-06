# PowerSync Build Day

This is an example self-hosted project using the PowerSync Open Edition version of the [PowerSync Service](https://github.com/powersync-ja/powersync-service), which is published to Docker Hub as `journeyapps/powersync-service`.

Learn more about self-hosting PowerSync [here](https://docs.powersync.com/self-hosting/getting-started).

# Run

Get backend and PowerSync set up by running:

```bash
docker compose up
```

In a new terminal get the frontend started with:

```bash
cd chat-app && pnpm i && pnpm start
```

# Config

The configuration can be modified to match other project topologies.

Edit the `.env` file and config files in the `./config` directory with your specific settings.

### Storage

The PowerSync Service uses MongoDB under the hood. A basic MongoDB replica-set service is available in `ps-mongo.yaml`. The `powersync.yaml` config is configured to use this service by default. Different MongoDB servers can be configured by removing the `include` statement from `docker-compose.yaml` and updating `powersync.yaml`.

### Authentication

This example uses JWKS which provides the public key directly to the PowerSync instance in `powersync.yaml`'s `jwks` section.

The `key-generator` project demonstrates generating RSA key pairs for token signing.

### Sync Rules

[Sync Rules](https://docs.powersync.com/usage/sync-rules) are currently defined by placing them in `./config/sync_rules.yaml`.

# Cleanup

The `setup.sql` script only runs on the first initialization of the container.

If you want to start from a fresh start:

- Delete the Docker volumes `mongo_storage` and `db_data`
  Their full names might vary depending on the directory where the `docker-compose` command was executed.
- Delete the service Docker containers.
