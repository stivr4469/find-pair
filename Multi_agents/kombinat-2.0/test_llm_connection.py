#!/usr/bin/env python3
"""
Test script to verify LLM connection
"""
import sys
import os

# Add src to path so we can import the modules
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from src.utils.llm_client import client, generate_text
from src.config import settings

def test_llm_connection():
    print("Testing LLM connection...")
    print(f"OPENAI_API_BASE: {settings.OPENAI_API_BASE}")
    print(f"OPENAI_MODEL_NAME: {settings.OPENAI_MODEL_NAME}")
    print(f"Client initialized: {client is not None}")
    
    if client is not None:
        print("✓ LLM client is properly initialized")
        
        # Test a simple call
        try:
            result = generate_text(
                system_prompt="You are a test assistant. Respond with 'Connection successful' and nothing else.",
                user_prompt="Test connection"
            )
            print(f"✓ Connection test result: {result[:100]}...")  # Truncate for display
            return True
        except Exception as e:
            print(f"✗ Error during LLM call: {e}")
            return False
    else:
        print("✗ LLM client is not initialized - check your .env configuration")
        return False

if __name__ == "__main__":
    test_llm_connection()