"use client";

import { useState, useTransition } from "react";
import { Trash2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormMessage, SubmitButton } from "@/components/admin/ui";
import { useActionState } from "react";
import {
  createUser,
  deleteUser,
  updateUser,
  type UserActionState,
} from "@/lib/actions/users";
import { roleDescriptions, roleLabels } from "@/lib/auth/roles";
import type { UserRole } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

export type UserRow = {
  id: string;
  email: string;
  fullName: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
};

const roles: UserRole[] = ["admin", "editor", "reception"];

export function CreateUserForm() {
  const [state, action] = useActionState<UserActionState, FormData>(
    createUser,
    {},
  );

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nume complet</Label>
          <Input id="fullName" name="fullName" required maxLength={120} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Parolă inițială</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={10}
            autoComplete="new-password"
          />
          <p className="text-xs text-muted-foreground">
            Minimum 10 caractere. Transmite-o pe un canal sigur.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Rol</Label>
          <Select name="role" defaultValue="reception">
            <SelectTrigger id="role">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {roles.map((r) => (
                <SelectItem key={r} value={r}>
                  {roleLabels[r]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ul className="space-y-1 rounded-xl bg-secondary/50 p-3 text-xs text-muted-foreground">
        {roles.map((r) => (
          <li key={r}>
            <strong className="text-foreground">{roleLabels[r]}</strong>{" "}
            — {roleDescriptions[r]}
          </li>
        ))}
      </ul>

      <FormMessage ok={state.ok} message={state.message} error={state.error} />

      <SubmitButton pendingLabel="Se creează…">
        <UserPlus className="size-4" />
        Creează cont
      </SubmitButton>
    </form>
  );
}

export function UserList({
  users,
  currentUserId,
}: {
  users: UserRow[];
  currentUserId: string;
}) {
  return (
    <ul className="divide-y divide-border">
      {users.map((user) => (
        <UserRowItem
          key={user.id}
          user={user}
          isSelf={user.id === currentUserId}
        />
      ))}
    </ul>
  );
}

function UserRowItem({ user, isSelf }: { user: UserRow; isSelf: boolean }) {
  const [role, setRole] = useState(user.role);
  const [isActive, setIsActive] = useState(user.isActive);
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  const save = (next: { role?: UserRole; isActive?: boolean }) => {
    const previous = { role, isActive };
    const merged = { role: next.role ?? role, isActive: next.isActive ?? isActive };
    setRole(merged.role);
    setIsActive(merged.isActive);

    startTransition(async () => {
      const result = await updateUser({ id: user.id, ...merged });
      if (result.ok) {
        toast.success(result.message ?? "Salvat.");
      } else {
        setRole(previous.role);
        setIsActive(previous.isActive);
        toast.error(result.error ?? "Nu am putut salva.");
      }
    });
  };

  const remove = () => {
    startTransition(async () => {
      const result = await deleteUser(user.id);
      if (result.ok) toast.success(result.message ?? "Șters.");
      else toast.error(result.error ?? "Nu am putut șterge.");
      setConfirming(false);
    });
  };

  return (
    <li className="flex flex-wrap items-center gap-3 py-4">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          {user.fullName || user.email}
          {isSelf && (
            <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs font-normal text-muted-foreground">
              tu
            </span>
          )}
        </p>
        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
      </div>

      {isSelf ? (
        // Propriul cont nu se poate modifica de aici: altfel un administrator
        // s-ar putea bloca singur în afara panoului.
        <span className="text-sm text-muted-foreground">{roleLabels[role]}</span>
      ) : (
        <>
          <Select
            value={role}
            onValueChange={(value) => save({ role: value as UserRole })}
            disabled={pending}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {roles.map((r) => (
                <SelectItem key={r} value={r}>
                  {roleLabels[r]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={pending}
            onClick={() => save({ isActive: !isActive })}
            className={cn(
              "rounded-full",
              isActive ? "" : "border-amber-500/40 text-amber-700",
            )}
          >
            {isActive ? "Activ" : "Dezactivat"}
          </Button>

          {confirming ? (
            <span className="flex items-center gap-1.5">
              <Button
                type="button"
                size="sm"
                variant="destructive"
                disabled={pending}
                onClick={remove}
                className="rounded-full"
              >
                Confirmă
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setConfirming(false)}
                className="rounded-full"
              >
                Renunță
              </Button>
            </span>
          ) : (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label={`Șterge contul ${user.email}`}
              disabled={pending}
              onClick={() => setConfirming(true)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </Button>
          )}
        </>
      )}
    </li>
  );
}
