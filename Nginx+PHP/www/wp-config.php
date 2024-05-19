<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'mysql2' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'WK{*faK^I2UaL@5/:Az*:33NfVw^`nzVU4HG?ZI~Oz+U+ n-X8IxR u}.qe+ufS&' );
define( 'SECURE_AUTH_KEY',  '+D)K}>LdlpTIt#v)l<u77Q[O<Zhib|s`_GV|P[ej.*pRu@N=}(4ZyuxXM-fzNd=E' );
define( 'LOGGED_IN_KEY',    '7m5pQo3+uhioH*XYa~5,4O `Yh%6OQFT.4<1kUI=5eHA!ov+8X1^nAqv9)b88[lD' );
define( 'NONCE_KEY',        '.rQ:pIu}3[ w4>&(U3!X96)@i!G{`[Mot#BvS@[*MTLuRmwRP$sxIzN{]Cr@|3QW' );
define( 'AUTH_SALT',        '=SV1nyYM@]w;Xyq}7#{wc@L$E:ATR?~5NuPE& mnEGT=TI2|iwptlv&AmOGMaw@;' );
define( 'SECURE_AUTH_SALT', '/9f97`uJ>I#F~[Z;=0N00l`8,,1eC8?S|9nH`erT{NW0JTpXiF$(BU)lQdzq3E=S' );
define( 'LOGGED_IN_SALT',   '>s<|I%8Z$)A|G??rIKa!G+Re]~]iK_{Hxwym}sF1#yG#8K~qXh(+kAya8KRSbXiv' );
define( 'NONCE_SALT',       '1m 0G[v&g$7`#<Ey?VPbP~.|,21B716mjaFJ2b /NSAfzR{L%W$c7J{C58iEr@<=' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
