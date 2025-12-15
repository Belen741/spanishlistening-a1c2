// Resend integration for sending emails
// Supports both development (Replit connector) and production (RESEND_API_KEY secret)
import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentialsFromConnector() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken || !hostname) {
    return null;
  }

  try {
    connectionSettings = await fetch(
      'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
      {
        headers: {
          'Accept': 'application/json',
          'X_REPLIT_TOKEN': xReplitToken
        }
      }
    ).then(res => res.json()).then(data => data.items?.[0]);

    if (!connectionSettings || !connectionSettings.settings.api_key) {
      return null;
    }
    return { 
      apiKey: connectionSettings.settings.api_key, 
      fromEmail: connectionSettings.settings.from_email 
    };
  } catch {
    return null;
  }
}

async function getCredentials() {
  // First try the Replit connector (works in development)
  const connectorCreds = await getCredentialsFromConnector();
  if (connectorCreds) {
    return connectorCreds;
  }

  // Fallback to environment variable (works in production)
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  
  if (!apiKey) {
    throw new Error('Resend not configured: Set RESEND_API_KEY secret for production');
  }
  
  return { apiKey, fromEmail };
}

export async function getResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail
  };
}
