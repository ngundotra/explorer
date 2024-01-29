'use client';

import { ParsedAccountRenderer } from '@components/account/ParsedAccountRenderer';
import { LoadingCard } from '@components/common/LoadingCard';
import { Suspense } from 'react';
import React from 'react';

import { ProgramInterfaceCard } from '@/app/components/account/ProgramInterfaceCard';
import { LoadingState, useTokenMetadata } from '@/app/components/account/SplTokenMetadataInterfaceCard';

type Props = Readonly<{
    params: {
        address: string;
    };
}>;

function ProgramInterfaceCardRenderer({
    account,
    onNotFound,
}: React.ComponentProps<React.ComponentProps<typeof ParsedAccountRenderer>['renderComponent']>) {
    const { loading, programOwner } = useTokenMetadata(account?.pubkey.toString());
    if (!account) {
        return onNotFound();
    }

    return loading === LoadingState.MetadataFound && programOwner ? (
        <Suspense fallback={<LoadingCard message="Looking up MSA instructions in the anchor IDL" />}>
            <ProgramInterfaceCard programId={programOwner?.toBase58()} />
        </Suspense>
    ) : (
        <LoadingCard message="Fetching metadata program address" />
    );
}

export default function ProgramInterfacePageClient({ params: { address } }: Props) {
    return <ParsedAccountRenderer address={address} renderComponent={ProgramInterfaceCardRenderer} />;
}
