#!/usr/bin/env python3
"""
Script to clear Redis streams and consumer groups for a fresh start.
This addresses the issue with stuck messages in Redis Streams consumer groups.
"""

import redis
import os
from src.config import settings


def clear_redis_streams():
    """Clear all Redis streams and consumer groups related to the application."""
    redis_client = redis.Redis(
        host=settings.REDIS_HOST,
        port=settings.REDIS_PORT,
        decode_responses=True
    )
    
    try:
        # List of streams to clear
        streams = [
            settings.STREAM_TASKS,
            settings.STREAM_LINT_RESULTS,
            settings.STREAM_TEST_RESULTS,
            settings.STREAM_PRS,
            settings.STREAM_SPECS,
        ]
        
        # List of consumer groups to delete
        groups = [
            settings.GROUP_TASKS,
            settings.GROUP_SPECS,
            settings.GROUP_PRS_LINTERS,
            settings.GROUP_PRS_TESTERS,
            settings.GROUP_RESULTS_ORCHESTRATOR,
        ]
        
        print("Clearing Redis streams and consumer groups...")
        
        for stream in streams:
            # Delete consumer groups for this stream
            for group in groups:
                try:
                    redis_client.xgroup_destroy(stream, group)
                    print(f"Deleted consumer group '{group}' for stream '{stream}'")
                except redis.exceptions.ResponseError as e:
                    if "NOGROUP" in str(e):
                        print(f"Consumer group '{group}' does not exist for stream '{stream}', continuing...")
                    else:
                        print(f"Error deleting consumer group '{group}' for stream '{stream}': {e}")
            
            # Delete the stream itself
            try:
                redis_client.delete(stream)
                print(f"Cleared stream '{stream}'")
            except Exception as e:
                print(f"Error clearing stream '{stream}': {e}")
        
        print("Redis state cleared successfully!")
        
    except Exception as e:
        print(f"Error during Redis cleanup: {e}")
        raise
    finally:
        redis_client.close()


if __name__ == "__main__":
    clear_redis_streams()