import React, { useRef } from "react";

function PressableButton({ onPress, disabled, children, ...rest }) {
  const fromPointerRef = useRef(false);

  const isInside = (el, x, y) => {
    const r = el.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  };

  const onPointerDown = (e) => {
    if (disabled || e.button === 1 || e.button === 2) return; // 左ボタン/タッチのみ
    e.currentTarget.setPointerCapture?.(e.pointerId);
    fromPointerRef.current = true; // 後続のclick（二重発火）を抑止するフラグ
  };

  const onPointerUp = (e) => {
    if (disabled) return;
    const el = e.currentTarget;
    const ok = isInside(el, e.clientX, e.clientY); // 離した位置が内側か判定
    el.releasePointerCapture?.(e.pointerId);
    if (ok) onPress?.(e);
  };

  const onPointerCancel = () => {
    fromPointerRef.current = false; // ジェスチャ中断（スクロール等）でキャンセル
  };

  const onClick = (e) => {
    // pointer 由来の click を抑止（onPointerUpですでに実行済み）
    if (fromPointerRef.current) {
      fromPointerRef.current = false;
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // キーボード操作（Enter/Space）の click は許可
    if (!disabled) onPress?.(e);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default PressableButton;