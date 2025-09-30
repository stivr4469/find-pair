# Kombinat - Multi-Agent AI System

Kombinat is a multi-agent AI system designed to automatically generate code from task descriptions through a pipeline of specialized agents.

## Architecture

The system consists of two main agents that communicate via Redis Streams:

1. **SpecAgent**: Generates technical specifications from task descriptions
2. **DevAgent**: Generates code based on the specifications

The agents communicate through three Redis streams:
- `kombinat:tasks`: Incoming tasks
- `kombinat:specs`: Generated specifications
- `kombinat:prs`: Generated code

## Components

### Core Infrastructure
- **BaseWorker**: Abstract class providing common functionality for all agents
- **Configuration**: Centralized settings and environment loading
- **Utilities**: Logging and Redis client utilities

### Agents
- **SpecAgent**: Generates technical specifications
- **DevAgent**: Generates code from specifications

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Adjust settings in `.env` if needed

3. Start the system with Docker Compose:
   ```bash
   docker-compose up --build
   ```

## Usage

The agents will automatically start processing messages from their respective streams. 
To test the system, you can add messages to the `kombinat:tasks` stream:

```bash
redis-cli 
XADD kombinat:tasks * task_id "task1" task_description "Implement authentication module"
```

Or use the orchestrator to initiate a new task:

```bash
python -m src.orchestrator.main
```

The system will process this through both agents and generate code in the `kombinat:prs` stream.

## Docker Services

- `redis`: Redis server for message streaming
- `spec_agent`: Specification generation agent
- `dev_agent`: Code generation agent (note: uses base_agent as template)

## MVP Implementation

This is a minimal viable product that simulates the behavior of LLM-powered agents using mock functions. 
In a production implementation, these would be replaced with actual LLM API calls.