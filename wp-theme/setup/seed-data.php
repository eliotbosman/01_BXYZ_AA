<?php
/**
 * Seed data — bxyz-anjaaurand
 * Run via: wp eval-file /setup/seed-data.php --allow-root
 */

$theme_dir = get_stylesheet_directory();
$img_dir   = $theme_dir . '/assets/img';

function bxyz_ensure_uploads_dir(): void {
    $upload = wp_upload_dir();
    if ( ! empty( $upload['error'] ) ) {
        WP_CLI::warning( 'Upload dir error: ' . $upload['error'] );
        return;
    }
    $basedir = $upload['basedir'];
    if ( ! is_dir( $basedir ) ) {
        wp_mkdir_p( $basedir );
    }
    $subdir = $basedir . '/' . gmdate( 'Y/m' );
    if ( ! is_dir( $subdir ) ) {
        wp_mkdir_p( $subdir );
    }
}

function bxyz_import_image( $file_path, $post_parent = 0, $alt = '' ) {
    if ( ! file_exists( $file_path ) ) {
        WP_CLI::warning( "Image not found: $file_path" );
        return false;
    }

    bxyz_ensure_uploads_dir();

    $upload = wp_upload_bits( basename( $file_path ), null, file_get_contents( $file_path ) );
    if ( $upload['error'] ) {
        WP_CLI::warning( 'Upload error: ' . $upload['error'] );
        return false;
    }

    $filetype  = wp_check_filetype( basename( $file_path ) );
    $attach_id = wp_insert_attachment( [
        'post_mime_type' => $filetype['type'],
        'post_title'     => sanitize_file_name( pathinfo( $file_path, PATHINFO_FILENAME ) ),
        'post_content'   => '',
        'post_status'    => 'inherit',
    ], $upload['file'], $post_parent );

    if ( is_wp_error( $attach_id ) ) {
        WP_CLI::warning( 'Attachment error: ' . $attach_id->get_error_message() );
        return false;
    }

    require_once ABSPATH . 'wp-admin/includes/image.php';
    wp_update_attachment_metadata( $attach_id, wp_generate_attachment_metadata( $attach_id, $upload['file'] ) );

    if ( $alt ) {
        update_post_meta( $attach_id, '_wp_attachment_image_alt', $alt );
    }

    return $attach_id;
}

function bxyz_set_field( string $name, $value, int $post_id ): void {
    if ( function_exists( 'update_field' ) ) {
        update_field( $name, $value, $post_id );
        return;
    }

    update_post_meta( $post_id, $name, $value );

    $acf_keys = [
        'project_order'       => 'field_bxyz_order',
        'project_description' => 'field_bxyz_description',
    ];

    $acf_key = $acf_keys[ $name ] ?? ( str_starts_with( $name, 'image_' ) ? 'field_bxyz_' . $name : 'field_bxyz_' . $name );
    update_post_meta( $post_id, '_' . $name, $acf_key );
}

function bxyz_count_project_images( int $post_id ): int {
    $count = 0;
    for ( $n = 1; $n <= 12; $n++ ) {
        $key = 'image_' . str_pad( $n, 2, '0', STR_PAD_LEFT );
        $id  = (int) get_post_meta( $post_id, $key, true );
        if ( ! $id && function_exists( 'get_field' ) ) {
            $val = get_field( $key, $post_id );
            $id  = is_array( $val ) ? (int) ( $val['ID'] ?? 0 ) : (int) $val;
        }
        if ( $id ) {
            $count++;
        }
    }
    return $count;
}

function bxyz_find_project_by_title( string $title ): ?WP_Post {
    foreach ( get_posts( [
        'post_type'      => 'bxyz_project',
        'post_status'    => 'any',
        'posts_per_page' => -1,
    ] ) as $post ) {
        if ( $post->post_title === $title ) {
            return $post;
        }
    }
    return null;
}

$projects = [
    [
        'title'       => 'These Words Are to Be Read Aloud',
        'order'       => 1,
        'description' => 'These Words Are to Be Read Aloud is an installation consisting of 3000 offset prints which visitors were invited to read aloud and take with them. The installation was accompanied by a performance, both shown at the Stedelijk Museum, Amsterdam, in March 2026. This work was made in collaboration with the visual artist and performer Maren Weertman.',
        'images'      => [
            [ 'file' => 'read-aloud-1.jpg', 'alt' => '3000 offset prints installed at the Stedelijk Museum.' ],
            [ 'file' => 'read-aloud-2.jpg', 'alt' => 'Visitors reading prints aloud at the Stedelijk Museum.' ],
        ],
    ],
    [
        'title'       => 'Loud Cows Choir',
        'order'       => 2,
        'description' => 'Loud Cows Choir is a series of reading of Ursula K. Le Gouin\'s text about female voice, made with Ivo Blackwood. 2024',
        'images'      => [
            [ 'file' => 'loud-cows-choir-1.jpg', 'alt' => 'Performers reading aloud during Loud Cows Choir.' ],
        ],
    ],
    [
        'title'       => 'Open Day',
        'order'       => 3,
        'description' => 'Campaign for the Gerrit Rietveld Academie\'s and the Sandberg Instituut\'s open day. Designed together with Ivo Blackwood, Velko Kalchev, and Manu-Sophie Linder in 2026. The big pencil was used as a collaborative writing tool throughout the campaign to invite students and staff of both institutions to handwrite the campaign. Made with Velko Kalchev, 2024.',
        'images'      => [
            [ 'file' => 'open-day-1.jpg', 'alt' => 'Open Day campaign poster, handwritten with the big pencil.' ],
            [ 'file' => 'open-day-2.jpg', 'alt' => 'Collaborative big pencil in use for Open Day.' ],
        ],
    ],
    [
        'title'       => 'One More Time',
        'order'       => 4,
        'description' => 'One More Time was a temporary cinema holding place in the Rietveld Pavilion on the 7, 8, 9, 10 and 11 April 2025. Designed and organised together with Ivo Blackwood and Chloé Gourvennec.',
        'images'      => [
            [ 'file' => 'one-more-time-1.jpg', 'alt' => 'Temporary cinema in the Rietveld Pavilion.' ],
            [ 'file' => 'one-more-time-2.jpg', 'alt' => 'Screening at One More Time cinema.' ],
        ],
    ],
    [
        'title'       => 'Deep Spring Karaoke',
        'order'       => 5,
        'description' => 'Deep Spring Karaoke happened on November 23 2025 at Maison Félix Salut in Amsterdam. Designed and organised together with Ivo Blackwood, Malva Askerup and Jaehyun Kim.',
        'images'      => [
            [ 'file' => 'karaoke-1.jpg', 'alt' => 'Deep Spring Karaoke Bar flyer, front.', 'grupp' => 'flyer' ],
            [ 'file' => 'karaoke-2.jpg', 'alt' => 'Deep Spring Karaoke Bar flyer, back.', 'grupp' => 'flyer' ],
            [ 'file' => 'karaoke-3.jpg', 'alt' => 'Deep Spring Karaoke event.' ],
        ],
    ],
    [
        'title'       => 'Printed Matter',
        'order'       => 6,
        'description' => 'An ongoing exploration of printed matter — publications, spreads, and material experiments across graphic design practice.',
        'images'      => [
            [ 'file' => 'hero.jpg', 'alt' => 'Printed Matter — selected publication spread.' ],
        ],
    ],
];

foreach ( $projects as $data ) {
    $existing = bxyz_find_project_by_title( $data['title'] );

    if ( $existing ) {
        $post_id = $existing->ID;
        WP_CLI::log( "Updating: {$data['title']}" );
    } else {
        $post_id = wp_insert_post( [
            'post_title'   => $data['title'],
            'post_content' => $data['description'],
            'post_type'    => 'bxyz_project',
            'post_status'  => 'publish',
            'menu_order'   => $data['order'],
        ] );

        if ( is_wp_error( $post_id ) ) {
            WP_CLI::warning( "Failed: {$data['title']}" );
            continue;
        }
        WP_CLI::success( "Created: {$data['title']}" );
    }

    bxyz_set_field( 'project_order', $data['order'], $post_id );
    bxyz_set_field( 'project_description', $data['description'], $post_id );

    $needs_images = bxyz_count_project_images( $post_id ) === 0;

    if ( $needs_images ) {
        foreach ( $data['images'] as $idx => $img ) {
            $field_key = 'image_' . str_pad( $idx + 1, 2, '0', STR_PAD_LEFT );
            $attach_id = bxyz_import_image( $img_dir . '/' . $img['file'], $post_id, $img['alt'] );
            if ( $attach_id ) {
                bxyz_set_field( $field_key, $attach_id, $post_id );
                if ( ! empty( $img['grupp'] ) ) {
                    update_post_meta( $post_id, $field_key . '_grupp', $img['grupp'] );
                }
            }
        }
    } else {
        WP_CLI::log( "  Images already present — skipping import." );
    }
}

$defaults = [
    'bxyz_site_name'     => 'Anja Aurand',
    'bxyz_bio_1'         => 'Anja Aurand is a French/Swedish graphic designer educated at <em>ENSAAMA</em> (Paris) and the <em>Gerrit Rietveld Academie</em> (Amsterdam). Her practice engages with printed matter, language, performance, scale and collaborative practices — book-making, large-scale campaigns, installations, event curation and printmaking.',
    'bxyz_bio_2'         => 'Paris / Amsterdam',
    'bxyz_collaborators' => "Ivo Blackwood\nMaren Weertman\nVelko Kalchev\nManu-Sophie Linder\nChloé Gourvennec\nMalva Askerup · Jaehyun Kim",
    'bxyz_institutions'  => "Stedelijk Museum, Amsterdam\nGerrit Rietveld Academie\nMAC VAL, Vitry-sur-Seine\nMABA, Nogent-sur-Marne\nMaison Félix Salut, Amsterdam",
    'bxyz_contact_email' => '',
    'bxyz_contact_link'  => '',
];

foreach ( $defaults as $key => $value ) {
    update_option( $key, $value );
}

WP_CLI::success( 'Seed data complete.' );
